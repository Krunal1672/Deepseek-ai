import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


//signup user - /api/v1/user/signup
export const signup = async (req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    try {
        const user = await User.findOne({email:email})
        if(user){
            return res.status(401).json({error:"user already exist"})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        await newuser.save();
        return res.status(201).json({message:"user signup successfully"})
    } catch (error) {
        console.log("error in signup",error);
        return res.status(500).json({error:"Error in signup"})
    }
}


//login user - /api/v1/user/login
export const login = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(403).json({error:"Inveliad Credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(403).json({error:"Inveliad Credentials"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_PASSWORD,{
            expiresIn:"7d",
        })
        const cookieOptions = {
            expires:new Date(Date.now()+24*60*60*1000),
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite:"Strict",
        }
        res.cookie("jwt",token,cookieOptions)
        return res.status(201).json({message:"user login successfully",user,token})
    } catch (error) {
        console.log("error in login",error);
        return res.status(500).json({error:"Error in login"}) 
    }
}

//logout user - /api/v1/user/logout
export const logout = async (req,res)=>{
   try {
    res.clearCookie("jwt")
    return res.status(201).json({message:"user logout successfully"})
   } catch (error) {
    console.log("error in logout",error);
    return res.status(500).json({error:"Error in logout"}) 
   }
} 