import catchAsycnErroe from "../middleware/catchAsycnErroe.js";
import User from "../model/userModel.js";
import { delete_file, upload_file } from "../utils/cloudnary.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
// import bcrypt from "bcryptjs"

export const register =catchAsycnErroe(async(req,res, next)=>{
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
          return  res.status(200).json({message : "User already exist"})
        }
        if (password.length < 6) {
          return  res.status(400).json({message : "Password must be at least 6 character"})
        }
    
        const user = await User.create({
            name,
            password,
            email
        })
        if (user) {
            const token = sendToken(user, 201, res)
            res.status(200).json({
                user,
                token
            })
        }else{
            res.status(400).json({message : "Invalid user data"})
        }
    } catch (error) {
        res.status(400).json({message : "Internal server error"})
    }
})

export const login = catchAsycnErroe(async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email or password", 400))

        }
        const user = await User.findOne({email}).select("+password")
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400))
        }
        const isPasswordMatch = await user.isPasswordCorrect(password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 401))
        }
        sendToken(user, 200, res)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message : "Internal server error"})
    }
})

export const logout = catchAsycnErroe(async(req, res, next)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({message : "Logout successfully"})
})

//get user profile 
export const getUser = catchAsycnErroe(async(req, res)=>{
  
    const user = await User.findById(req?.user?._id)
    res.status(200).json({user})
})

//get all users
export const allUser = catchAsycnErroe(async(req, res)=>{
    const user = await User.find()
    res.status(200).json({user})
})

//get user details
export const userDetails = catchAsycnErroe(async(req,res, next)=>{
  
    const user = await User.findById(req?.params?.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with id :${req?.params?.id}`))
    }
    res.status(200).json({user})
})

//social auth
export const socialAuth = catchAsycnErroe(async(req,res,next)=>{
    const {name, email, avatar} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        const newUser = await User.create({name,email,avatar})
        sendToken(newUser,200,res)
    }else{
        sendToken(user,200,res)
    }
})

//update password
export const updatePassword = catchAsycnErroe(async(req,res,next)=>{
    const user = await User.findById(req?.user?._id).select("+password")
    const isPasswordMatch = await user.isPasswordCorrect(req.body.oldPassword)
    if (!isPasswordMatch) {
      return next(new ErrorHandler("old password is incorrect.", 400))
    }
    user.password = req.body.password
    user.save()
    res.status(200).json({
      success : true
    })
    
    })

    //update user
    export const updateUser = catchAsycnErroe(async(req,res,next)=>{
        const newUser = {
            name : req.body.name,
            email : req.body.email
        }
        const user = await User.findByIdAndUpdate(req?.user?._id, newUser, {new : true})
        res.status(200).json({user})
    })

    //upload avatar
    export const uploadAvatar = catchAsycnErroe(async(req, res, next)=>{
        const avatarResponse = await upload_file(req.body.avatar, "e-learning/avatars")
        //Remove previous avatar
        if(req?.user?.avatar?.url)
         {
       await delete_file(req?.user?.avatar?.public_id);
         }
        const user = await User.findByIdAndUpdate(req?.body?._id, {
         avatar : avatarResponse
        })
        
         res.status(200).json({
           user
         })
       })