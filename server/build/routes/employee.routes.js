"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isModerator_middleware_1 = require("../middlewares/isModerator.middleware");
const isAdmin_middleware_1 = require("../middlewares/isAdmin.middleware");
router.route('/')
    .get([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], employee_controller_1.getEmployees)
    .post([auth_middleware_1.verifyToken, isAdmin_middleware_1.isAdmin], employee_controller_1.AddEmployee);
router.route('/:employeeId')
    .get(auth_middleware_1.verifyToken, employee_controller_1.getEmployee)
    .delete([auth_middleware_1.verifyToken, isAdmin_middleware_1.isAdmin], employee_controller_1.deleteEmployee)
    .put([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], employee_controller_1.updateEmployee);
exports.default = router;
