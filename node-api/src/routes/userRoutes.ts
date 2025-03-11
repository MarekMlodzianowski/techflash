import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  getUsersByCompany, 
  getUsersByCountry 
} from '../controllers/userController';

const router = Router();

router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.get('/byCompany/:companyId', getUsersByCompany);
router.get('/byCountry/:countryCode', getUsersByCountry);

export default router;
