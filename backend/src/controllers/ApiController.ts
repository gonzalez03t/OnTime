import { Router } from 'express';
import adminRoute from '../middleware/adminRoute';
import validateSession from '../middleware/validateSession';
import { AdminController } from './AdminController';
import { AppointmentController } from './AppointmentController';
import { AuthController } from './AuthController';
import { ReminderController } from './ReminderController';
import { UserController } from './UserController';

/**
 * This is the MAIN router for this REST api. It consists of other, nested controllers
 * to handle specific tasks
 */
const router = Router();

router.use('/appointments', validateSession, AppointmentController);
router.use('/auth', AuthController);
router.use('/reminders', validateSession, ReminderController);
router.use('/users', validateSession, UserController);
router.use('/admin', validateSession, adminRoute, AdminController);
// router.use('/doctors', validateSession, doctorRoute, DoctorController);

export const ApiController = router;
