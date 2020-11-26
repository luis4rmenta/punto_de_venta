import { Router } from 'express';
import { deleteOutPut, getOutput, getOutputs, newOutput, updateOutput } from '../controllers/output.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';
const router = Router();

router.route('/')
    .get([verifyToken, isModerator], getOutputs)
    .post(verifyToken, newOutput);

router.route('/:outputId')
    .get(verifyToken, getOutput)
    .post([verifyToken, isModerator], updateOutput)
    .delete([verifyToken, isModerator], deleteOutPut);

export default router;
