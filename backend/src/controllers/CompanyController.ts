import { Router } from 'express';
import getCompanies from '../endpoints/company/getCompanies';
import getEmployees from '../endpoints/company/getEmployees';
import registerCompany from '../endpoints/company/registerCompany';
import registerEmployee from '../endpoints/company/registerEmployee';
import companyAdminRoute from '../middleware/companyAdminRoute';
import requireBody from '../middleware/requireBody';
import requireSession from '../middleware/requireSession';

/**
 * This controller handles all authentication functions.
 */

const router = Router();

router.get('/', getCompanies);
router.post('/new', requireBody, registerCompany);
router.post('/employees', requireBody, requireSession, getEmployees);
router.post('/employees/new', requireBody, companyAdminRoute, registerEmployee);

export const CompanyController = router;
