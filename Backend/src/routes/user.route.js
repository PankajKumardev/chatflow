import {Router} from "express"
import { getCurrentUser, login, logout, signup, updateProfile } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout) 

// Protected routes
router.post("/update-profile",verifyJWT,updateProfile)
router.get("/current-user",verifyJWT,getCurrentUser)

export default router