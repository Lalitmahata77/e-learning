import catchAsycnErroe from "../middleware/catchAsycnErroe.js";
import Notification from "../model/notifikationModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import cron from "node-cron"
export const notificatons = catchAsycnErroe(async(req,res,next)=>{
    const allNotifications = await Notification.find().sort({createdAt : -1})
    res.status(200).json({
        success : true,
        allNotifications
    })
})

//update notification
export const updateNotification = catchAsycnErroe(async(req,res,next)=>{
    const notification = await Notification.findById(req.params.id)
    if (!notification) {
        return next(new ErrorHandler("notification not found",400))
    }else{
        notification.status ? (notification.status = "read") : notification?.status
    }
    await notification.save()
    const notifications = await Notification.find().sort({createdAt : -1})
    res.status(200).json({
        success : true,
        notifications
    })
})

cron.schedule("0 0 0 * * *",async()=>{
    const thirtyDayAgo = new Date(Date.now() - 30*24*60*60*1000)
    await Notification.deleteMany({status : "read", createdAt:{$lt:thirtyDayAgo}});
    console.log("Deleted read notifications");
    
})