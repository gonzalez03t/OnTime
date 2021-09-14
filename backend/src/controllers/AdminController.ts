import { Router } from 'express';
import changeRole from '../endpoints/admin/changeRole';
import getAppointments from '../endpoints/admin/getAppointments';
import getUsers from '../endpoints/admin/getUsers';

/**
 * This controller handles all admin functions.
 */

const router = Router();

router.get('/users', getUsers);
router.post('/users/change-role', changeRole);
router.post('/appointments', getAppointments);

// TODO: approve/reject pending companies
// TODO: approve/reject pending company images

export const AdminController = router;
