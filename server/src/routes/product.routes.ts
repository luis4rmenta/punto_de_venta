import { Router } from 'express';
const router = Router();

import { getProducts, getProduct, newProduct, updateProduct, deleteProduct, findProductByCodebar, findProductByName } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';


router.route('/')
    .get(verifyToken, getProducts)
    .post([verifyToken, isModerator], newProduct);

router.route('/:productId')
    .get(verifyToken, getProduct)
    .put([verifyToken, isModerator], updateProduct)
    .delete([verifyToken, isModerator], deleteProduct);

router.route('/codebar/:codebar')
    .get(verifyToken, findProductByCodebar);

router.route('/name/:productName')
    .get(verifyToken, findProductByName);
export default router;
