const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/Http/HomeController');
router.get('/message/:slug', HomeController.renderMessage);
router.get('/user/:slug', HomeController.renderUser);
module.exports = router;