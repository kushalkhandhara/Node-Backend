import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
 

// Secret Key
const secretKey = "CLIENT_SECRET_KEY";

// Register
export const registerUser = async (req, res) => {
    try {
        const { userName, fullname, email, password, gender, dateOfBirth, country } = req.body;

        // Check if all required fields are provided
        if (!userName || !fullname || !email || !password || !gender || !dateOfBirth || !country) {
            return res.status(400).json({ success: false, message: "All fields are mandatory" });
        }

        // Validate gender value
        if (!["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).json({ success: false, message: "Invalid gender value" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            userName,
            fullname,
            email,
            password: hashPassword,
            gender,
            dateOfBirth,
            country
        });

        // Save user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user: { id: savedUser._id, userName: savedUser.userName, email: savedUser.email }
        });

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password || email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ success: false, message: "All fields are mandatory" });
        }



        // Check if the user exists
        const existingUser = await User.findOne({ email }).select("+password");

 

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found, please register" });
        }

   
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

 

        // Generate JWT token
        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
                userName: existingUser.userName
            },
            secretKey,
            { expiresIn: "60m" }
        );

        // console.log("Error");
        // return;

        // Set the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            sameSite: "strict"
        });

        // Successful login response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: existingUser._id,
                userName: existingUser.userName,
                email: existingUser.email
            },
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Logout
export const logout = async(req,res)=>{
    try{
        console.log("Here Error");
        res.clearCookie("token").json({
            success : true,
            message : "Logged Out Successfully"
        });
  
        
 

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Some Error Occured"
        });

    }
}

// Auth Middle Ware
export const authMiddleware = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
       
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Unauthorised User"
            })
        }
        try{
            const decode = jwt.verify(token,secretKey);
            req.user = decode;
            next();
    
        }catch(error){
            console.log(error.message);
            return res.status(401).json({
                success : false,
                message : "Unauthorised User"
            })
        }

    }catch(error)
    {
        console.log(error.message)
    }
}
 
// Search API
export const searchUser = async (req, res) => {
    try {
        // Extract search parameters
        const { query } = req.body; // ?query=username_or_email
        

        if (!query || query.trim() === "") {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        // Search for user by username or email
        const users = await User.find({
            $or: [{ userName: query }, { email: query }]
        }).select("-password"); // Exclude password from results

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        res.status(200).json({ success: true, users });

    } catch (error) {
        console.error("Search API Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


