import catchAsycnErroe from "../middleware/catchAsycnErroe.js";
import Layout from "../model/layoutModel.js";
import { delete_file, upload_file } from "../utils/cloudnary.js";
import ErrorHandler from "../utils/errorHandler.js";
export const createLayout = catchAsycnErroe(async(req,res,next)=>{
    const {type} = req.body;
    const isTypeExists = await Layout.findOne({type})
    if (isTypeExists) {
        return next(new ErrorHandler(`${type} already exist`, 400))
    }
    if (type === "Banner") {
        const {image,title,subTitle} = req.body;
        const avatarResponse = await upload_file(req.body.avatar, "e-learning/avatars")
        const banner = {
            image : {
                publick_id :avatarResponse.publick_id,
                url : avatarResponse.secure_url

            },
            title,
            subTitle,
            
        }
        await Layout.create(banner)
    }
    if (type === "FAQ") {
        const {faq} = req.body;
        const faqItem = await Promise.all(
            faq.map((item)=>{
                return {
                    question : item.question,
                    anawer : item.anawer
                }
            })
        )
        await Layout.create({type : "FAQ", faq : faqItem})
    }
    if (type === "categories") {
        const {categories} = req.body;
        const categoryItem = await Promise.all(
            categories.map((item)=>{
                return{
                    title : item.title
                }
            })
        )
        await Layout.create({type : "categories", categories : categoryItem})
    }

    res.status(200).json({
        success : true,
        message : "Layout created successfully"
    })
})


export const updateLayout = catchAsycnErroe(async(req,res,next)=>{
    const {type} = req.body;
    if (type === "Banner") {
        const banarData = await Layout.findOne({type : "Banner"})
        const {image,title,subTitle} = req.body;
        if (banarData) {
            await delete_file(banarData?.avatars?.public_id);
        }
        const avatarResponse = await upload_file(req.body.avatar, "e-learning/avatars")
        const banner = {
            image : {
                publick_id :avatarResponse.publick_id,
                url : avatarResponse.secure_url

            },
            title,
            subTitle,
            
        }
        await Layout.findByIdAndUpdate(banarData.id, {banner})
    }
    if (type === "FAQ") {
        const {faq} = req.body;
        const faqItem = await Layout.findOne({type : "FAQ"})
        const faqItems = await Promise.all(
            faq.map((item)=>{
                return {
                    question : item.question,
                    anawer : item.anawer
                }
            })
        )
        await Layout.findByIdAndUpdate(faqItem._id,{type : "FAQ", faq : faqItems})
    }
    if (type === "categories") {
        const {categories} = req.body;
        const categoriesData = await Layout.findOne({type : "categories"})
        const categoryItem = await Promise.all(
            categories.map((item)=>{
                return{
                    title : item.title
                }
            })
        )
        await Layout.findByIdAndUpdate(categoriesData._id,{type : "categories", categories : categoryItem})
    }

    res.status(200).json({
        success : true,
        message : "Layout created successfully"
    })
})

export const getLayoutByType = catchAsycnErroe(async(req,res,next)=>{
    const {type} = req.body;
    const layout = await Layout.findOne({type})
    res.status(200).json({
        success : true,
        layout
    })
})