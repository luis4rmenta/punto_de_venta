import { Router } from 'express';
import { deletePerson, getPeople,getPerson,newPerson, updatePerson } from '../controllers/person.controller';
const router = Router();

router.route('/')
    .get(getPeople)
    .post(newPerson);

router.route('/:personId')
    .get(getPerson)
    .put(updatePerson)
    .delete(deletePerson);

export default router;