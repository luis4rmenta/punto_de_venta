import { Router } from "express";
import { getUserType, login, register } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.route('/userType')
    .get([verifyToken], getUserType);

export default router;