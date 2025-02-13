import express from 'express';
import { authMiddleware, login, registerUser, searchUser } from '../controllers/auth-controller.js';
 
const router = express.Router();

// For Registeration of new user 
router.post("/register",registerUser);

// For Login User
router.post("/login",login);
 
// Search User
router.post("/search",searchUser);

// MiddleWare 
router.get("/check-auth",authMiddleware,(req,res)=>{
    const user = req.user;


    res.status(200).json({
        success : true,
        message : "User Authenticated",
        user  
    });
    
}
);

export default router;