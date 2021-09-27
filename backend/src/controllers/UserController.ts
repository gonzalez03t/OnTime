import { Router } from 'express';
import favoriteCompany from '../endpoints/user/favoriteCompany';
import getFavoritedCompanies from '../endpoints/user/getFavoritedCompanies';
import getViewer from '../endpoints/user/getViewer';
import baseUserRoute from '../middleware/baseUserRoute';

/**
 * This controller handles all user-entity interactions
 */

const router = Router();

router.get('/viewer', getViewer);
router.get('/favorites', baseUserRoute, getFavoritedCompanies);

router.post('/favorites', baseUserRoute, favoriteCompany);

export const UserController = router;
