import { Router } from 'express';
import { deleteOutPut, getOutput, getOutputs, newOutput, updateOutput } from '../controllers/output.controller';
const router = Router();

router.route('/')
    .get(getOutputs)
    .post(newOutput);

router.route('/:outputId')
    .get(getOutput)
    .post(updateOutput)
    .delete(deleteOutPut);

export default router;
