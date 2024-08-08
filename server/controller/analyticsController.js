import catchAsycnErroe from "../middleware/catchAsycnErroe.js";
import Course from "../model/courseModel.js";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import { generateAnalytics12Month } from "../utils/analyticsGenerator.js";

export const getUserAnalytics = catchAsycnErroe(async(req,res,next)=>{
    const users = await generateAnalytics12Month(User)
    res.status(200).json({
        success : true,
        users
    })
})
export const getCourseAnalytics = catchAsycnErroe(async(req,res,next)=>{
    const courses = await generateAnalytics12Month(Course)
    res.status(200).json({
        success : true,
        courses
    })
})

export const getOrderAnalytics = catchAsycnErroe(async(req,res,next)=>{
    const orders = await generateAnalytics12Month(Order)
    res.status(200).json({
        success : true,
        orders
    })
})