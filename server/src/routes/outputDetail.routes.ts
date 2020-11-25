import { Router } from 'express';
import { deleteOutputDetail, getOutputDetail, getOutputDetails, newOutputDetail, updateOutputDetail } from '../controllers/outputDetail.controller';
import { verifyToken } from '../middlewares/auth.middleware';
const router = Router();

router.route('/')
    .get(verifyToken, getOutputDetails)
    .post(verifyToken, newOutputDetail);

router.route('/:outputDetailId')
    .get(verifyToken, getOutputDetail)
    .put(verifyToken, updateOutputDetail)
    .delete(verifyToken, deleteOutputDetail);

export default router;
