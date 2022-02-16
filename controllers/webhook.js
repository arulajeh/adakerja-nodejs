const env = require('dotenv').config().parsed;
const {
  getOrCreateUser
} = require('../modules/users');
const {
  recordMessage,
  handleFillName,
  handleFillDob,
  handleStart,
  handleCheckBirthday,
  handleFinish
} = require('../modules/webhook');

const getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

const postWebhook = async (req, res) => {
  let body = req.body;
  if (body.object === 'page') {

    body.entry.forEach(async function (entry) {
      // Gets the message.
      let webhook_event;
      if (entry.messaging) {
        webhook_event = entry.messaging[0];
      }
      if (webhook_event && webhook_event.message) {
        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        // Get the message text
        let message_text = webhook_event.message.text;
        // Get the message payload
        let message_payload = webhook_event.message.quick_reply ? webhook_event.message.quick_reply.payload : null;

        let user = await getOrCreateUser(sender_psid);

        switch (user.state) {
          case "start":
            await handleStart(sender_psid, message_text);
            break;
          case "fill_name":
            await handleFillName(sender_psid, message_text);
            break;
          case "fill_dob":
            await handleFillDob(sender_psid, message_text);
            break;
          case "check_birthday":
            await handleCheckBirthday(sender_psid, message_text, user, message_payload);
            break;
          case "finish":
            await handleFinish(sender_psid, user, message_payload);
            break;
        }
        // Record every message from user
        await recordMessage(sender_psid, message_text);
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  getWebhook,
  postWebhook
}