import { Router } from 'express';
import authenticatedRoute from '../middleware/authenticatedRoute';
import createChangePasswordToken from '../endpoints/token/createChangePasswordToken';
import createForgotPasswordToken from '../endpoints/token/createForgotPasswordToken';

const router = Router();

router.post('/password/change', authenticatedRoute, createChangePasswordToken);
router.post('/password/forgot', createForgotPasswordToken);

export const TokenController = router;
