import express from "express";
import { get } from "mongoose";
import { getAllBugs, createBug, changeCompletedStatus } from "../controllers/bug.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";;

const router = express.Router();

router.get ('/',authMiddleware, getAllBugs);

router.post ('/',authMiddleware, createBug);

router.put('/:id/completedStatus',authMiddleware, changeCompletedStatus );

export default router;