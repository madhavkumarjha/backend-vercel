import { registerUser } from "../controllers/auth.controllers.js";
import express from "express";
import { authorizeRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",registerUser);


export default router;