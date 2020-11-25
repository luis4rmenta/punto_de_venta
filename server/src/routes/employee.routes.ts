import { Router } from 'express';
const router = Router();

import { getEmployees, AddEmployee, getEmployee, deleteEmployee, updateEmployee } from '../controllers/employee.controller';
import { verifyToken } from '../middlewares/auth.middleware';


router.route('/')
    .get(verifyToken, getEmployees)
    .post(verifyToken, AddEmployee);

router.route('/:employeeId')
    .get(verifyToken, getEmployee)
    .delete(verifyToken, deleteEmployee)
    .put(verifyToken, updateEmployee);

export default router;
