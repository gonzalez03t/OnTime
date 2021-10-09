import { Router } from 'express';
import getCompanies from '../endpoints/company/getCompanies';
import getCompany from '../endpoints/company/getCompany';
import getEmployees from '../endpoints/company/getEmployees';
import inviteEmployee from '../endpoints/company/inviteEmployee';
import registerCompany from '../endpoints/company/registerCompany';
import registerEmployee from '../endpoints/company/registerEmployee';
import authenticatedRoute from '../middleware/authenticatedRoute';
import companyAdminRoute from '../middleware/companyAdminRoute';
import requireBody from '../middleware/requireBody';
import requireSession from '../middleware/requireSession';

/**
 * This controller handles all authentication functions.
 */

const router = Router();

router.get('/', getCompanies);
router.get('/:name', getCompany);
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

export const CompanyController = router;
