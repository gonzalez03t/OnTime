import { Router } from 'express';
import createAppointment from '../endpoints/appointment/createAppointment';
import getFilledSlots from '../endpoints/appointment/getFilledSlots';
import requireBody from '../middleware/requireBody';
import validateSession from '../middleware/validateSession';
import getUserAppointments from '../endpoints/appointment/getUserAppointments';

/**
 * This controller handles all appointment-entity interactions
 */

const router = Router();

router.get('/', getUserAppointments);

router.post('/filled', validateSession, getFilledSlots);

// TODO: update appointment (create separate routes for reschedule, change status, etc)
// router.post('/update', requireBody, validateSession, updateAppointment);
// router.post('/reschedule', validateSession, rescheduleAppointment);

// TODO: post appointment --> NOT ACTUAL DELETE, just change status
// router.post('/delete', requireBody, validateSession, deleteAppointment);

router.post('/new', validateSession, requireBody, createAppointment);

export const AppointmentController = router;
