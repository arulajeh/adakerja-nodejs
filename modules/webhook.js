const { request } = require("./common");
const env = require('dotenv').config().parsed;
const db = require('../models');
const moment = require('moment');
const { updateUser, daysTillBirthday } = require("./users");
const uri = 'https://graph.facebook.com/v13.0/me/messages?access_token=' + env.PAGE_ACCESS_TOKEN;

const sendTextMessage = (sender_psid, text) => {
  return request({
    uri: uri,
    body: {
      "recipient": { "id": sender_psid },
      "message": { text }
    },
  }, function (err, res) {
    if (err) {
      console.log('Error sending message: ', err);
    } else if (res.body.error) {
      console.log('Error: ', res.body.error);
    }
  });
}

const sendQuickReply = (sender_psid, text, quick_replies) => {
  return request({
    uri: uri,
    body: {
      "recipient": { "id": sender_psid },
      "messaging_type": "RESPONSE",
      "message": {
        text,
        quick_replies
      }
    },
  }, function (err, res) {
    if (err) {
      console.log('Error sending message: ', err);
    } else if (res.body.error) {
      console.log('Error: ', res.body.error);
    }
  });
}

const recordMessage = (userid, message) => {
  return db.chat_histories.create({
    userid,
    message
  });
}

const generateQuickReplies = (title, payload) => {
  return {
    "content_type": "text",
    "title": title,
    "payload": payload
  }
}

const handleStart = async (sender_psid, message_text) => {
  if (message_text.toLowerCase() == 'hi') {
    await sendTextMessage(sender_psid, 'Hello, what is your name?');
    await updateUser(sender_psid, { state: "fill_name" });
  } else {
    const replies = [
      generateQuickReplies('Hi', 'hi'),
    ];
    await sendQuickReply(sender_psid, 'Sorry, I did not understand that.', replies);
  }
}

const handleFillName = async (sender_psid, message_text) => {
  await sendTextMessage(sender_psid, 'Hi ' + message_text + ', please input your date of birth (YYYY-MM-DD)');
  await updateUser(sender_psid, { state: "fill_dob", name: message_text });
}

const handleFillDob = async (sender_psid, message_text) => {
  var validDob = moment(message_text, 'YYYY-MM-DD', true).isValid();
  if (validDob) {
    const reply = [
      generateQuickReplies('Yes', 'yes'),
      generateQuickReplies('No', 'no'),
    ];
    await sendQuickReply(sender_psid, 'Do you wants to know how many days till your next birthday?', reply);
    await updateUser(sender_psid, { state: "check_birthday", dob: message_text });
  } else {
    await sendTextMessage(sender_psid, 'Please enter a valid date of birth (YYYY-MM-DD)');
  }
}

const handleCheckBirthday = async (sender_psid, message_text, user, message_payload) => {
  const replies = message_payload ? message_payload : message_text;
  if (yesAnswer.includes(replies)) {
    const dayTillBirthday = daysTillBirthday(user.dob);
    await sendTextMessage(sender_psid, `There are ${dayTillBirthday} days left until your next birthday`);
    await updateUser(sender_psid, { state: "finish" });
  } else if (noAnswer.includes(replies)) {
    await sendTextMessage(sender_psid, 'Goodbye 👋');
    await updateUser(sender_psid, { state: "finish" });
  } else {
    const reply = [
      generateQuickReplies('Yes', 'yes'),
      generateQuickReplies('No', 'no'),
    ];
    await sendQuickReply(sender_psid, 'Sorry, I did not understand that.', reply);
  }
}

const handleFinish = async (sender_psid, user, message_payload) => {
  
  switch (message_payload) {
    case "start_over":
      await updateUser(sender_psid, { state: "start" });
      await handleStart(sender_psid, 'hi');
      break;
    case "no_start_over":
      await sendTextMessage(sender_psid, 'Goodbye 👋');
      break;
    default:
      const dayTillBirthday = daysTillBirthday(user.dob);
      await sendTextMessage(sender_psid, `Hey ${user.name}, Your birthday is coming in ${dayTillBirthday} days`);
      const reply = [
        generateQuickReplies('Yes', 'start_over'),
        generateQuickReplies('No', 'no_start_over'),
      ];
      await sendQuickReply(sender_psid, 'Do you want to start over from the beginning?', reply);
      break;
  }
}

const yesAnswer = [
  "yes",
  "ya",
  "y",
  "yeah",
  "yay",
  "yep",
  "yup",
  "yaa",
  "yaaa",
  "ok",
  "oke",
  "okey"
];
const noAnswer = [
  "no",
  "nope",
  "nah",
  "n",
  "noo"
];

module.exports = {
  yesAnswer,
  noAnswer,
  sendTextMessage,
  recordMessage,
  handleFillName,
  handleFillDob,
  handleStart,
  handleCheckBirthday,
  handleFinish
}