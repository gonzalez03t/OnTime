import { Router } from 'express';
import favoriteCompany from '../endpoints/user/favoriteCompany';
import getFavoritedCompanies from '../endpoints/user/getFavoritedCompanies';
import getViewer from '../endpoints/user/getViewer';
import updateNotificationPreference from '../endpoints/user/updateNotificationPreference';
import updateUserPassword from '../endpoints/user/updateUserPassword';
import updateUserProfile from '../endpoints/user/updateUserProfile';
import baseUserRoute from '../middleware/baseUserRoute';
import requireBody from '../middleware/requireBody';
import validateOtpCode from '../middleware/validateOtpCode';

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
router.put(
  '/settings/password',
  requireBody,
  validateOtpCode,
  updateUserPassword
);

export const UserController = router;
