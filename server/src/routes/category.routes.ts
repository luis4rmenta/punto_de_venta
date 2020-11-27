import { Router } from 'express'
import { deleteCategory, getCategories, getCategory, newCategory, updateCategory } from '../controllers/category.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';


const router = Router();


router.route('/')
    .get(verifyToken, getCategories)
    .post([verifyToken, isModerator], newCategory);
    
    router.route('/:categoryId')
    .put([verifyToken, isModerator], updateCategory)
    .get(verifyToken, getCategory)
    .delete([verifyToken, isModerator], deleteCategory);

export default router;