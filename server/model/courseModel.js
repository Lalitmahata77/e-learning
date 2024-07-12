import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    user : {
        type : Object,
       
        rating : {
            type : Number,
            default : 0,
        },
        comment : {
            type : String
        }
    }
})

const linkSchema = new mongoose.Schema({
    title : String,
    url : String
})

const commentSchema = new mongoose.Schema({
    user : Object,
   
    comment : String,
    commentReplies : [{
        type : Object,
        
    }]
})

const courseDataSchema = new mongoose.Schema({
    title : String,
    description : String,
    videoUrl : String,
    videoSection : String,
    videoThumnail : String,
    videoPlayer : String,
    videoLength : Number,
    links : [linkSchema],
    suggetion : String,
    question : [commentSchema]
})

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    estimatedPrice : {
        type : String
    },
    thumnail : {
        public_id : String,
        url : String
    },
    tags : {
        type : String,
        required : true
    },
    demoUrl : {
        type : String,
        required : true
    },
    level : {
        type : String,
        required : true
    },
    banefits : [{title : String}],
    prerequisites : [{title : String}],
    reviews : [reviewSchema],
    courseData : [courseDataSchema],
    ratings : {
        type : String,
        default : 0
    },
    purchesed : {
        type : String,
        default : 0
    }

},{timestamps : true})

const Course = mongoose.model("Course", courseSchema)
export default Course