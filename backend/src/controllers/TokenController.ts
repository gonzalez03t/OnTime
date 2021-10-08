import { Router } from 'express';
import authenticatedRoute from '../middleware/authenticatedRoute';
import createChangePasswordToken from '../endpoints/token/createChangePasswordToken';

const router = Router();

router.post('/password/change', authenticatedRoute, createChangePasswordToken);

export const TokenController = router;
