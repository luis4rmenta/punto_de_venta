"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const employee_controller_1 = require("../controllers/employee.controller");
router.route('/')
    .get(employee_controller_1.getEmployees)
    .post(employee_controller_1.AddEmployee);
router.route('/:employeeId')
    .get(employee_controller_1.getEmployee)
    .delete(employee_controller_1.deleteEmployee)
    .put(employee_controller_1.updateEmployee);
exports.default = router;
