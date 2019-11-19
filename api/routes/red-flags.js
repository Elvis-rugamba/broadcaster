const express = require('express');
const checkAuth = require('../middlewares/check-auth');
const RedFlagsController = require('../controllers/red-flags');

const router = express.Router();

router.get('/', checkAuth, RedFlagsController.redFlags_get_all);

router.get('/:redFlagId', checkAuth, RedFlagsController.redFlags_get_redFlag);

module.exports = router;