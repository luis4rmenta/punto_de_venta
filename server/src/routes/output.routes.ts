import { Router } from 'express';
import { deleteOutPut, getOutput, getOutputs, newOutput, updateOutput } from '../controllers/output.controller';
import { verifyToken } from '../middlewares/auth.middleware';
const router = Router();

router.route('/')
    .get(verifyToken, getOutputs)
    .post(verifyToken, newOutput);

router.route('/:outputId')
    .get(verifyToken, getOutput)
    .post(verifyToken, updateOutput)
    .delete(verifyToken, deleteOutPut);

export default router;
