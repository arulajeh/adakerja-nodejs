const express = require('express'),
  router = express.Router(),
  messages = require('../controllers/messages');

router.get('/messages', messages.getAll)
  .get('/messages/:id', messages.getById)
  .get('/summary', messages.summary);

module.exports = router;