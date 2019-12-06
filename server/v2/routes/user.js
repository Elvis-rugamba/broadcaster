import express from 'express';
import UserController from '../controllers/user';
import UserValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/signup', UserValidation.validateUser, UserController.userSignup);
router.post('/signin', UserValidation.validateLogin, UserController.userSignin);

export default router;