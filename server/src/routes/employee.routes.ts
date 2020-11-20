import { Router } from 'express';
const router = Router();

import { getEmployees, AddEmployee, getEmployee, deleteEmployee, updateEmployee } from '../controllers/employee.controller';


router.route('/')
    .get(getEmployees)
    .post(AddEmployee);

router.route('/:employeeId')
    .get(getEmployee)
    .delete(deleteEmployee)
    .put(updateEmployee);

export default router;
