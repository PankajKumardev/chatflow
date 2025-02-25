import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = Router()

// Protected routes
router.get("/users",verifyJWT,getUserForSidebar) 
router.get("/:id",verifyJWT,getMessages) 
router.post("/send/:id",verifyJWT,sendMessage) 

export default router