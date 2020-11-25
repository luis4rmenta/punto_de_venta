import { Router } from 'express'
import { deleteCategory, getCategories, getCategory, newCategory, updateCategory } from '../controllers/category.controller';
import { verifyToken } from '../middlewares/auth.middleware';


const router = Router();


router.route('/')
    .get(verifyToken, getCategories)
    .post(verifyToken, newCategory)
    .put(verifyToken, updateCategory);

router.route('/:categoryId')
    .get(verifyToken, getCategory)
    .delete(verifyToken, deleteCategory);

export default router;