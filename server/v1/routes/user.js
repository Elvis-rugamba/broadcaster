import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();

router.post('/signup', UserController.userSignup);

router.post('/signin', UserController.userSignin);

export default router;