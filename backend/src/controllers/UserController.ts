import { Router } from 'express';
import getViewer from '../endpoints/user/getViewer';
import authenticatedRoute from '../middleware/authenticatedRoute';

/**
 * This controller handles all user-entity interactions
 */

const router = Router();

router.get('/viewer', authenticatedRoute, getViewer);

// TODO: list clients --> should this be in admin controller??
// router.post('/clients', adminRoute, getclients)

// TODO: get client --> should this be in admin controller??
// router.post('/client', adminRoute, getclient)

export const UserController = router;
