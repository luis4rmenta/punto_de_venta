import { Router } from 'express';
const router = Router();

import { addInput, deleteInput, getInputById, updateInput } from '../controllers/input.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';

router.route('/')
    .post(verifyToken, addInput)
    .put([verifyToken, isModerator], updateInput);

router.route('/:inputId')
    .get(verifyToken, getInputById)
    .delete([verifyToken, isModerator], deleteInput);
export default router;

