import { Router } from 'express';
import createAppointment from '../endpoints/appointment/createAppointment';
import getFilledSlots from '../endpoints/appointment/getFilledSlots';
import requireBody from '../middleware/requireBody';

import getUserAppointments from '../endpoints/appointment/getUserAppointments';
import cancelAppointment from '../endpoints/appointment/cancelAppointment';
import rescheduleAppointment from '../endpoints/appointment/rescheduleAppointment';

/**
 * This controller handles all appointment-entity interactions
 */

const router = Router();

router.get('/', getUserAppointments);
router.post('/filled', getFilledSlots);
router.post('/new', requireBody, createAppointment);
router.post('/cancel', requireBody, cancelAppointment);
router.post('/reschedule', requireBody, rescheduleAppointment);

// TODO: update appointment (create separate routes for reschedule, change status, etc)
// router.post('/update', requireBody, updateAppointment);
// router.post('/reschedule', rescheduleAppointment);

export const AppointmentController = router;
