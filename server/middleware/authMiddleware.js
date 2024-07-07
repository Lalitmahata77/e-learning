import jwt from "jsonwebtoken"
import catchAsyncHandler from "./catchAsycnErroe.js"
import ErrorHandler from "../utils/errorHandler.js"
import User from "../model/userModel.js";
export const isAthenticated = catchAsyncHandler(async(req, res, next)=>{
    const {token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Invalid token", 401))
    }
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id)
    next()
})

//authorizeRole

export const authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role(${req.user.role}) is not allow to acess this resource`)
            )
        }
        next()
    }
}