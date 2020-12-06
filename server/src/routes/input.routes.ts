import { Router } from 'express';
const router = Router();

import { deleteInput, getInput, getInputs, newInput, updateInput } from '../controllers/input.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';

router.route('/')
    .get(getInputs)
    .post(verifyToken, newInput);
    
    router.route('/:inputId')
    .put([verifyToken, isModerator], updateInput)
    .get(verifyToken, getInput)
    .delete([verifyToken, isModerator], deleteInput);
export default router;

