const router = require('express').Router();
const emailService = require('../services/mail.service.js');

router.post('/sendmail', emailService.logEmployee);

module.exports = router;