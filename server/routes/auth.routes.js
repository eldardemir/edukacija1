import express  from "express";
import { register } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
