import { Router } from 'express';
import { deletePerson, getPeople,getPerson,newPerson, updatePerson } from '../controllers/person.controller';
import { verifyToken } from '../middlewares/auth.middleware';
const router = Router();

router.route('/')
    .get(verifyToken, getPeople)
    .post(verifyToken, newPerson);

router.route('/:personId')
    .get(verifyToken, getPerson)
    .put(verifyToken, updatePerson)
    .delete(verifyToken, deletePerson);

export default router;