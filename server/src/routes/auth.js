import express from 'express';
import authController from '../controllers/user/authController';

const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/requestrefreshtoken', authController.requestRefreshToken)

export default router