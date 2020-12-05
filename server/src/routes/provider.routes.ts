import { Router } from 'express';
const router = Router();

import { deleteProvider, getProvider, getProviders, newProvider, updateProvider } from '../controllers/provider.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';


router.route('/')
    .get([verifyToken, isModerator], getProviders)
    .post([verifyToken, isAdmin], newProvider);
    
    router.route('/:providerId')
    .get(verifyToken, getProvider)
    .put([verifyToken, isAdmin], updateProvider)
    .delete([verifyToken, isAdmin], deleteProvider);

export default router;