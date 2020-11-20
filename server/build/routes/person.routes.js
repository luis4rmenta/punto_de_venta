"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_controller_1 = require("../controllers/person.controller");
const router = express_1.Router();
router.route('/')
    .get(person_controller_1.getPeople)
    .post(person_controller_1.newPerson);
router.route('/:personId')
    .get(person_controller_1.getPerson)
    .put(person_controller_1.updatePerson)
    .delete(person_controller_1.deletePerson);
exports.default = router;
