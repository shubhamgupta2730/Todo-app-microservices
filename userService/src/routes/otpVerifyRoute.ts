import { verifyOTP } from '../controllers/OTPVerifyController';
import express from 'express';
const router = express.Router();

router.post('/verify', verifyOTP);

export default router;
