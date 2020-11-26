import { Router } from 'express';
import { deletePerson, getPeople,getPerson,newPerson, updatePerson } from '../controllers/person.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';
const router = Router();

router.route('/')
    .get([verifyToken, isModerator], getPeople)
    .post([verifyToken, isAdmin], newPerson);

router.route('/:personId')
    .get(verifyToken, getPerson)
    .put([verifyToken, isModerator], updatePerson)
    .delete([verifyToken, isAdmin], deletePerson);

export default router;