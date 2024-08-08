import path from "path"
import ejs from "ejs"
import sendEmail from "../utils/sendMail.js"
import catchAsycnErroe from "../middleware/catchAsycnErroe.js"
import User from "../model/userModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import Course from "../model/courseModel.js"
import Order from "../model/orderModel.js"
import Notification from "../model/notifikationModel.js"

export const createOrder = catchAsycnErroe(async(req,res,next)=>{
    const {courseId,payment_info} = req.body
    const user = await User.findById(req.user?._id)
    const CourseExistInUser = user.courses.some((course)=>course._id.toString() === courseId)
    if (CourseExistInUser) {
        return next(new ErrorHandler("you have already purched this course",400))
    }
    const course = await Course.findById(courseId)
    if (!course) {
        return next(new ErrorHandler("Course not found with that id",400))
    }
    const data ={
        courseId : course?._id,
        userId : user?._id,
        payment_info
    }
    
const mailData = {
    order : {
        _id : course._id.toString().slice(0,6),
        name : course.name,
        price : course.price,
        date : new Date().toLocaleDateString("en-US", {year : "numeric",month:"long",day:"numeric"})
        
    }
    
}
// const html = await ejs.renderFile(path.join(__dirname,"../mails/orderConfirmation.ejs",{order:mailData}))
// try {
//     if (user) {
//         await sendEmail({
//             email : user.email,
//             subject : "order confirmation",
//             template : "orderConfirmation.ejs",
//             data : mailData
//         })
//     }
// } catch (error) {
//     return next (new ErrorHandler("internal server error",500))
// }
user?.courses.push(course?._id)
await user?.save()
await Notification.create({
    user : user?._id,
    title : "new order",
    message : `You have a new order from ${course?.name}`
})
course.purchesed ? course.purchesed += 1 : course.purchesed;
await course.save()
const newOrder = await Order.create(data)
res.status(200).json({newOrder})
})

export const allOrders = catchAsycnErroe(async(req,res,next)=>{
    const order = await Order.find()
    res.status(200).json({
        success : true,
        order
    })
})