import { Router } from 'express';
import getPendingCompanies from '../endpoints/company/admin/getPendingCompanies';
import verifyCompany from '../endpoints/company/admin/verifyCompany';
import verifyCompanyImage from '../endpoints/company/admin/verifyCompanyImage';
import getCompanies from '../endpoints/company/getCompanies';
import getEmployees from '../endpoints/company/getEmployees';
import registerCompany from '../endpoints/company/registerCompany';
import registerEmployee from '../endpoints/company/registerEmployee';
import updateCompanyProfile from '../endpoints/company/updateCompanyProfile';
import updateCompanySettings from '../endpoints/company/updateCompanySettings';
import adminRoute from '../middleware/adminRoute';
import authenticatedRoute from '../middleware/authenticatedRoute';
import companyAdminRoute from '../middleware/companyAdminRoute';
import companyOwnerRoute from '../middleware/companyOwnerRoute';
import requireBody from '../middleware/requireBody';
import requireSession from '../middleware/requireSession';
import inviteEmployee from '../endpoints/company/inviteEmployee';

/**
 * This controller handles all authentication functions.
 */

const router = Router();

router.get('/', getCompanies);

router.post('/new', requireBody, registerCompany);
router.post('/employees', requireBody, requireSession, getEmployees);
router.post(
  '/employees/invite',
  requireBody,
  authenticatedRoute,
  companyAdminRoute,
  inviteEmployee
);
router.post(
  '/employees/new',
  requireBody,
  authenticatedRoute,
  companyAdminRoute,
  registerEmployee
);

router.put(
  '/:id/profile',
  requireBody,
  companyOwnerRoute,
  updateCompanyProfile
);

router.put(
  '/:id/settings',
  requireBody,
  companyOwnerRoute,
  updateCompanySettings
);

// ADMIN
router.get('/pending', adminRoute, getPendingCompanies);
router.put('/:id/status', adminRoute, requireBody, verifyCompany);
router.put('/:id/image/status', adminRoute, requireBody, verifyCompanyImage);

export const CompanyController = router;
