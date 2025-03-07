import { Router } from 'express';
import {
	getAllCountries,
	getCountryByCode,
	getCountryByName,
} from '../controllers/countryController';

const router = Router();

router.get('/', getAllCountries);
router.get('/code/:code', getCountryByCode);
router.get('/:name', getCountryByName);

export default router;
