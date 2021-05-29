import { Router } from 'express';
import getViewer from '../endpoints/user/getViewer';
import validateSession from '../middleware/validateSession';

/**
 * This controller handles all user-entity interactions
 */

const router = Router();

router.get('/viewer', validateSession, getViewer);

// TODO: list patients --> should this be in admin controller??
// router.post('/patients', adminRoute, getPatients)

// TODO: get patient --> should this be in admin controller??
// router.post('/patient', adminRoute, getPatient)

export const UserController = router;
