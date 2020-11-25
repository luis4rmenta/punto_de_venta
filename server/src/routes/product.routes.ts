import { Router } from 'express';
const router = Router();

import { getProducts, getProduct, newProduct, updateProduct, deleteProduct, findProductByCodebar } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';


router.route('/')
    .get(verifyToken, getProducts)
    .post(verifyToken, newProduct);

router.route('/:productId')
    .get(verifyToken, getProduct)
    .put(verifyToken, updateProduct)
    .delete(verifyToken, deleteProduct);

router.route('/codebar/:codebar')
    .get(verifyToken, findProductByCodebar);
export default router;
