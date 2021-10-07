import { Router } from 'express';
import favoriteCompany from '../endpoints/user/favoriteCompany';
import getFavoritedCompanies from '../endpoints/user/getFavoritedCompanies';
import getViewer from '../endpoints/user/getViewer';
import updateNotificationPreference from '../endpoints/user/updateNotificationPreference';
import updateUserProfile from '../endpoints/user/updateUserProfile';
import baseUserRoute from '../middleware/baseUserRoute';
import requireBody from '../middleware/requireBody';

/**
 * This controller handles all user-entity interactions
 */

const router = Router();

router.get('/viewer', getViewer);
router.get('/favorites', baseUserRoute, getFavoritedCompanies);

router.post('/favorites', baseUserRoute, requireBody, favoriteCompany);

router.put('/settings/profile', requireBody, updateUserProfile);
router.put(
  '/settings/notifications',
  requireBody,
  updateNotificationPreference
);

export const UserController = router;
