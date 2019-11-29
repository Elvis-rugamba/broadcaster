import express from 'express';
import checkAuth from '../middlewares/check-auth';
import upload from '../middlewares/upload';
import RedFlagsController from '../controllers/red-flags';

const router = express.Router();

router.get('/', checkAuth, RedFlagsController.redFlagsGetAll);

router.get('/:redFlagId', checkAuth, RedFlagsController.redFlagsGetRedFlag);

router.post('/', checkAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), RedFlagsController.redFlagsCreateRedFlag);

router.patch('/:redFlagId', checkAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), RedFlagsController.redFlagsUpdateRedFlag);

router.patch('/:redFlagId/:field', checkAuth, RedFlagsController.redFlagsUpdateRedFlagField);

router.delete('/:redFlagId', checkAuth, RedFlagsController.redFlagsDeleteRedFlag);

export default router;