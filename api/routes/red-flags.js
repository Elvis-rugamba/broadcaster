const express = require('express');
const checkAuth = require('../middlewares/check-auth');
const upload = require('../middlewares/upload');
const RedFlagsController = require('../controllers/red-flags');

const router = express.Router();

router.get('/', checkAuth, RedFlagsController.redFlags_get_all);

router.get('/:redFlagId', checkAuth, RedFlagsController.redFlags_get_redFlag);

router.post('/', checkAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), RedFlagsController.redFlags_create_redFlag);

router.patch('/:redFlagId', checkAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), RedFlagsController.redFlags_update_redFlag);

router.patch('/:redFlagId/:field', checkAuth, RedFlagsController.redFlags_update_redFlag_field);

router.delete('/:redFlagId', checkAuth, RedFlagsController.redFlags_delete_redFlag);

module.exports = router;