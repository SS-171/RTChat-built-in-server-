const express = require('express');
const router = express.Router();
const LoginController = require('../app/controllers/Http/LoginController');
router.get('/', LoginController.login);
module.exports = router;