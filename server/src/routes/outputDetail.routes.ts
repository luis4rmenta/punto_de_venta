import { Router } from 'express';
import { deleteOutputDetail, getOutputDetail, getOutputDetails, newOutputDetail, updateOutputDetail } from '../controllers/outputDetail.controller';
const router = Router();

router.route('/')
    .get(getOutputDetails)
    .post(newOutputDetail);

router.route('/:outputDetailId')
    .get(getOutputDetail)
    .put(updateOutputDetail)
    .delete(deleteOutputDetail);

export default router;
