import { Router } from 'express';
import authenticatedRoute from '../middleware/authenticatedRoute';
import { AppointmentController } from './AppointmentController';
import { AuthController } from './AuthController';
import { CompanyController } from './CompanyController';
import { S3ImageController } from './S3ImageController';
import { ReminderController } from './ReminderController';
import { TokenController } from './TokenController';
import { UserController } from './UserController';

/**
 * This is the MAIN router for this REST api. It consists of other, nested controllers
 * to handle specific tasks
 */
const router = Router();

router.use('/appointments', authenticatedRoute, AppointmentController);
router.use('/auth', AuthController);
router.use('/companies', CompanyController);
router.use('/tokens', TokenController);
router.use('/reminders', authenticatedRoute, ReminderController);
router.use('/users', authenticatedRoute, UserController);
router.use('/s3/images', authenticatedRoute, S3ImageController);

export const ApiController = router;
