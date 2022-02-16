const db = require('../models');
const { getAllMessages, getMessagesById, getSummary } = require('../modules/messages');

const getAll = async (req, res) => {
  const messages = await getAllMessages();
  return res.json(messages);
}

const getById = async (req, res) => {
  const id = req.params.id;
  const message = await getMessagesById(id);
  return res.json(message);
}

const summary = async (req, res) => {
  const summaryData = await getSummary();
  return res.json(summaryData);
}

module.exports = {
  getAll,
  getById,
  summary
}