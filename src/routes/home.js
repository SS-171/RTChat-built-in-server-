const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/Http/HomeController');
router.get('/delete/:room/:username', HomeController.deleteUser)
router.post('/', HomeController.chatRoom);
module.exports = router;