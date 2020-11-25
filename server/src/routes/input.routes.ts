import { Router } from 'express';
const router = Router();

import { addInput, deleteInput, getInputById, updateInput } from '../controllers/input.controller';
import { verifyToken } from '../middlewares/auth.middleware';

router.route('/')
    .post(verifyToken, addInput)
    .put(verifyToken, updateInput);

router.route('/:inputId')
    .get(verifyToken, getInputById)
    .delete(verifyToken, deleteInput);
export default router;

