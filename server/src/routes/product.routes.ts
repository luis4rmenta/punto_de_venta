import { Router } from 'express';
const router = Router();

import { getProducts, getProduct, newProduct, updateProduct, deleteProduct, findProductByCodebar } from '../controllers/product.controller';


router.route('/')
    .get(getProducts)
    .post(newProduct);

router.route('/:productId')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/codebar/:codebar')
    .get(findProductByCodebar);
export default router;
