import express from 'express';
import { resetPassword } from '../controllers/resetPasswordController';

const router = express.Router();

router.post('/resetPassword', resetPassword);

export default router;
