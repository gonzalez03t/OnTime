import { Router } from 'express';
import getUserReminders from '../endpoints/reminder/getUserReminders';
import createTestReminder from '../endpoints/reminder/createTestReminder';
import authenticatedRoute from '../middleware/authenticatedRoute';

const router = Router();

// TODO: list reminders
router.get('/', authenticatedRoute, getUserReminders);

router.post('/test', createTestReminder);

// TODO: create reminder
// TODO: remove reminder
// TODO: remove all (clear) reminders

export const ReminderController = router;
