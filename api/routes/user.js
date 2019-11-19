const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', UserController.user_get_all);

router.post('/signup', UserController.user_signup);

router.post('/signin', UserController.user_signin);

// router.delete('/:userId', UserController.user_delete);

module.exports = router;