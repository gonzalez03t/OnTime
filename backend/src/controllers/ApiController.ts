import { Router } from 'express';
import adminRoute from '../middleware/adminRoute';
import authenticatedRoute from '../middleware/authenticatedRoute';
import { AdminController } from './AdminController';
import { AppointmentController } from './AppointmentController';
import { AuthController } from './AuthController';
import { CompanyController } from './CompanyController';
import { ReminderController } from './ReminderController';
import { UserController } from './UserController';

/**
 * This is the MAIN router for this REST api. It consists of other, nested controllers
 * to handle specific tasks
 */
const router = Router();

router.use('/appointments', authenticatedRoute, AppointmentController);
router.use('/auth', AuthController);
router.use('/company', CompanyController);
router.use('/reminders', authenticatedRoute, ReminderController);
router.use('/users', authenticatedRoute, UserController);
router.use('/admin', authenticatedRoute, adminRoute, AdminController);

export const ApiController = router;
