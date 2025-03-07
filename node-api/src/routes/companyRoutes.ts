import { Router } from 'express';
import {
	getAllCompanies,
	getCompaniesByCountry,
	getCompanyById,
} from '../controllers/companyController';

const router = Router();

router.get('/all', getAllCompanies);
router.get('/:id', getCompanyById);
router.get('/byCountry/:countryCode', getCompaniesByCountry);

export default router;
