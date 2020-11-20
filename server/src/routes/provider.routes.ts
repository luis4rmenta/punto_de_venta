import { Router } from 'express';
const router = Router();

import { deleteProvider, getProvider, getProviders, newProvider, updateProvider } from '../controllers/provider.controller';


router.route('/')
    .get(getProviders)
    .post(newProvider)
    .put(updateProvider);

router.route('/:providerId')
    .get(getProvider)
    .delete(deleteProvider);

export default router;