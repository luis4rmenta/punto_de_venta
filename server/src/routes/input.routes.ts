import { Router } from 'express';
const router = Router();

import { addInput, deleteInput, getInputById, updateInput } from '../controllers/input.controller';

router.route('/')
    .post(addInput)
    .put(updateInput);

router.route('/:inputId')
    .get(getInputById)
    .delete(deleteInput);
export default router;

