import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question : {type : String},
    anawer : {type : String}
})

const categorySchema = new mongoose.Schema({title : String})

const bannerImageSchema = new mongoose.Schema({
    publick_id : {type : String},
    url : {type: String}
})

const layoutSchema = new mongoose.Schema({
   type : {type : String},
   faq : [faqSchema],
   categories : [categorySchema],
   banner : {
    image : bannerImageSchema,
    title : {type : String},
    subTitle : {type : String}
   }

})

const Layout = mongoose.model("Layout",layoutSchema)
export default Layout