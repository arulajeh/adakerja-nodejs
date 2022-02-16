const express = require('express'),
  router = express.Router(),
  webhook = require('../controllers/webhook');

router
  .get('/', webhook.getWebhook)
  .post('/', webhook.postWebhook);

module.exports = router;