import { Router } from 'express';
import { deleteOutputDetail, getOutputDetail, getOutputDetails, newOutputDetail, newOutputDetails, updateOutputDetail } from '../controllers/outputDetail.controller';
import { verifyToken } from '../middlewares/auth.middleware';
const router = Router();

router.route('/')
    .get(verifyToken, getOutputDetails)
    .post(verifyToken, newOutputDetail);

router.route('/:outputDetailId')
    .get(verifyToken, getOutputDetail)
    .put(verifyToken, updateOutputDetail)
    .delete(verifyToken, deleteOutputDetail);

router.route('/array')
    .post(verifyToken, newOutputDetails);

export default router;
