const express = require('express'),
  webhook = require('./webhook'),
  messages = require('./messages'),
  router = express.Router();

router
  .use('/webhook', webhook)
  .use('/', messages);

module.exports = router;