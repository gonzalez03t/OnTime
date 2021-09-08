import { Router } from 'express';
import createAppointment from '../endpoints/appointment/createAppointment';
import getFilledSlots from '../endpoints/appointment/getFilledSlots';
import requireBody from '../middleware/requireBody';
import authenticatedRoute from '../middleware/authenticatedRoute';
import getUserAppointments from '../endpoints/appointment/getUserAppointments';

/**
 * This controller handles all appointment-entity interactions
 */

const router = Router();

router.get('/', getUserAppointments);

router.post('/filled', authenticatedRoute, getFilledSlots);

// TODO: update appointment (create separate routes for reschedule, change status, etc)
// router.post('/update', requireBody, authenticatedRoute, updateAppointment);
// router.post('/reschedule', authenticatedRoute, rescheduleAppointment);

// TODO: post appointment --> NOT ACTUAL DELETE, just change status
// router.post('/delete', requireBody, authenticatedRoute, deleteAppointment);

router.post('/new', authenticatedRoute, requireBody, createAppointment);

export const AppointmentController = router;
