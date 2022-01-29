import { Router } from 'express';
import login from '../endpoints/auth/login';
import logout from '../endpoints/auth/logout';
import register from '../endpoints/auth/register';
import validateOtp from '../endpoints/auth/validateOtp';
import requireBody from '../middleware/requireBody';
import authenticatedRoute from '../middleware/authenticatedRoute';
import requireSession from '../middleware/requireSession';
import registerAsCompanyOwner from '../endpoints/auth/registerAsCompanyOwner';
import createNewLoginOtp from '../endpoints/auth/createNewLoginOtp';
import validateOtpCode from '../middleware/validateOtpCode';
import changeForgottenPassword from '../endpoints/auth/changeForgottenPassword';

/**
 * This controller handles all authentication functions.
 */

const router = Router();

router.post('/login', requireBody, login);
router.post('/logout', authenticatedRoute, logout);
router.post('/register', requireBody, register);
router.post('/register-company-owner', requireBody, registerAsCompanyOwner);

router.post('/otp/validate', requireSession, requireBody, validateOtp);
router.post('/otp/new', requireSession, createNewLoginOtp);

router.post(
  '/password/forgot',
  requireBody,
  validateOtpCode,
  changeForgottenPassword
);

export const AuthController = router;
