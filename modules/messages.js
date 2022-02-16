const db = require('../models');

const getAllMessages = () => {
  return db.chat_histories.findAll({
    attributes: ['id', 'userid', 'message'],
  }).then(messages => {
    return messages ? messages : [];
  });
}
const getMessagesById = (id) => {
  return db.chat_histories.findOne({
    where: { id: id },
    attributes: ['id', 'userid', 'message'],
  }).then(message => {
    return message ? message.get({ plain: true }) : null;
  });
}
const getSummary = () => {
  return db.users.findAll({
    attributes: [
      ['userid', 'user'],
      'name',
      [db.Sequelize.fn('array_agg', db.Sequelize.col('chat_histories.message')), 'messages'],
    ],
    include: [
      {
        model: db.chat_histories,
        attributes: [],
        required: false
      }
    ],
    group: ['users.userid'],
  });
}

module.exports = {
  getAllMessages,
  getMessagesById,
  getSummary
}