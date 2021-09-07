import { Router } from 'express';
import createOtp from '../endpoints/auth/createOtp';
import login from '../endpoints/auth/login';
import logout from '../endpoints/auth/logout';
import register from '../endpoints/auth/register';
import validateOtp from '../endpoints/auth/validateOtp';
import requireBody from '../middleware/requireBody';
import authenticatedRoute from '../middleware/authenticatedRoute';

/**
 * This controller handles all authentication functions.
 */

const router = Router();

router.post('/login', requireBody, login);
router.post('/logout', authenticatedRoute, logout);
router.post('/register', requireBody, register);

router.post('/otp/validate', authenticatedRoute, requireBody, validateOtp);
router.post('/otp/new', authenticatedRoute, createOtp);

// TODO: forgot password --> look into how to handle this
// router.post('/password/forgot', requireBody, forgotPassword);
// router.post('/password/reset', requireBody, forgotPassword);

export const AuthController = router;
