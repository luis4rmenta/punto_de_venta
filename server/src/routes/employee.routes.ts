import { Router } from 'express';
const router = Router();

import { getEmployees, AddEmployee, getEmployee, deleteEmployee, updateEmployee } from '../controllers/employee.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isModerator } from '../middlewares/isModerator.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';


router.route('/')
    .get([verifyToken, isModerator], getEmployees)
    .post([verifyToken, isAdmin], AddEmployee);

router.route('/:employeeId')
    .get(verifyToken, getEmployee)
    .delete([verifyToken, isAdmin], deleteEmployee)
    .put([verifyToken, isAdmin], updateEmployee);

export default router;
