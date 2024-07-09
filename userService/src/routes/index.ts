import express from 'express';
import loginRoutes from './loginRoute';
import signupRoutes from './signupRoute';
import verifyOTPRoutes from './otpVerifyRoute';
import resetPasswordRoutes from './resetPasswordRoute';

const router = express.Router();

router.use('/api/v1', loginRoutes);
router.use('/api/v1', signupRoutes);
router.use('/api/v1', resetPasswordRoutes);
router.use('/api/v1', verifyOTPRoutes);

export default router;
