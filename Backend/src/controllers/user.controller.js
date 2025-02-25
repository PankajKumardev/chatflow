import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
import cloudinary from "../utils/cloudinary.js"

export const signup = async (req,res) => {
    const {fullName,email,password} = req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const existedUser = await User.findOne({email})

        if(existedUser){
            return res.status(400).json({message:"Email already exists"})
        }
        
    
        const hashPassword = await bcrypt.hash(password,10)

        const user = new User({
            fullName,
            email,
            password:hashPassword
        })

        if(user){
            generateToken(user._id,res)
            await user.save()

            res.status(201).json({
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body
    try {
        if(!email && !password){
            return res.status(400).json({message:"all fields are required"})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password"})
        }

        generateToken(user._id,res)

        res.status(201).json({
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log("Error in login",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile = async (req,res) =>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"})
        }

        const file = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic:file.secure_url},
            {new:true}
        )

        res.json(updatedUser)
    } catch (error) {
        console.log("Error in updating profile",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getCurrentUser = async (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in getting user info",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}


