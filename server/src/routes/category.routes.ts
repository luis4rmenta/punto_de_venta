import { Router } from 'express'
import { deleteCategory, getCategories, getCategory, newCategory, updateCategory } from '../controllers/category.controller';
const router = Router();


router.route('/')
    .get(getCategories)
    .post(newCategory)
    .put(updateCategory);

router.route('/:categoryId')
    .get(getCategory)
    .delete(deleteCategory);

export default router;