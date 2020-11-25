import { Router } from 'express';
const router = Router();

import { deleteProvider, getProvider, getProviders, newProvider, updateProvider } from '../controllers/provider.controller';
import { verifyToken } from '../middlewares/auth.middleware';


router.route('/')
    .get(verifyToken, getProviders)
    .post(verifyToken, newProvider)
    .put(verifyToken, updateProvider);

router.route('/:providerId')
    .get(verifyToken, getProvider)
    .delete(verifyToken, deleteProvider);

export default router;