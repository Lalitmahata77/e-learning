import mongoose from "mongoose";
import catchAsycnErroe from "../middleware/catchAsycnErroe.js";
import Course from "../model/courseModel.js";
import { delete_file, upload_file } from "../utils/cloudnary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const uploadCourse = catchAsycnErroe(async(req,res,next)=>{
   try {
    const data = {
      name:req.body.name ,
      description : req.body.description,
      price : req.body.price,
      estimatedPrice : req.body.estimatedPrice,
      thumbnail : req.body.thumbnail,
      tags : req.body.tags,
      level : req.body.level,
      demoUrl : req.body.demoUrl,
      benefits : req.body.benefits,
      preRequisites : req.body.preRequisites,
      // reviews : req.body.reviews,
      // courseData : req.body.courseData,
      rating : req.body.rating,
      purshed : req.body.purshed
    };

      const courseResponse = await upload_file(data?.thumbnail, "e-learning/courses")
   
     const course = await Course.findByIdAndUpdate(req?.body?._id, {
      course : courseResponse
     })
const createCourse =await Course.create(data)
     
      res.status(200).json({
        course,
        createCourse
      })
   } catch (error) {
    return next(new ErrorHandler(error.message, 500))
   }
})

//edit course
export const editCourse = catchAsycnErroe(async(req,res,next)=>{
  let data = {
    name: req.body.name,
    description : req.body.description,
    price : req.body.price,
    estimatedPrice : req.body.estimatedPrice,
    thumbnail : req.body.thumbnail,
    tags : req.body.tags,
    level : req.body.level,
    demoUrl : req.body.demoUrl,
    benefits : req.body.benefits,
    preRequisites : req.body.preRequisites,
    // reviews : req.body.reviews,
    // courseData : req.body.courseData,
    rating : req.body.rating,
    purshed : req.body.purshed
  };
const courseId = req.params?.id
  // const thumbnail = data.thumbnail
  // if (thumbnail) {
  //   await delete_file(req?.course?.thumbnail?.public_id);
  //   await upload_file(data.thumbnail.public_id, "e-learning/courses")

  // }
  const course = await Course.findByIdAndUpdate(courseId, 
     data
  ,{new : true})
console.log(course);
  res.status(200).json({success : true, course})
})

//get single course-->without purchasing
export const getSingleCourse = catchAsycnErroe(async(req,res,next)=>{
  const {id} = req.params;
  const course = await Course.findById(id).select("courseData.videoUrl courseData.links courseData.suggetion courseData.question")
  res.status(200).json({course})
})

//get all courses -->without purchasing
export const getAllCourses = catchAsycnErroe(async(req,res,next)=>{
  const courses = await Course.find().select("courseData.videoUrl courseData.links courseData.suggetion courseData.question")
  res.status(200).json({success : true, courses})
})

//get single course --> with purchasing
export const getSingleCoursePurchasing = catchAsycnErroe(async(req,res,next)=>{
  const userCourseList = req.user?.courses;
  const courseId = req.params.id;
  const courseExist = await userCourseList?.find((course)=>course._id.toString() === courseId)
  if (!courseExist) {
    return next(new ErrorHandler("course not found please purchase course", 404))
  }
  const course = await Course.findById(courseId);
  const content = course?.courseData;
  res.status(200).json({
    success : true,
    content
  })
})

//add questions
export const addQuestions = catchAsycnErroe(async(req,res,next)=>{
  const {question, courseId, contentId} = req.body;
  const course = await Course.findById(courseId);
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    return next(new ErrorHandler("Invalid content Id", 400))
  }

  const courseContent =  course?.courseData?.find((item)=> item._id.equals(contentId))
  if (!courseContent) {
    return next(new ErrorHandler("Invalid content Id", 400))
  }

  const newQuestion = {
    user : req.user,
    question,
    questionReplies : []
  }
  courseContent.question.push(newQuestion)
  await course?.save()
  res.status(200).json({
    success : true,
    course
  })

})

//add answer
export const addAnswer = catchAsycnErroe(async(req,res,next)=>{
  const {answer, courseId, contentId, questionId} = req.body;
  const course = await Course.findById(courseId);
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    return next(new ErrorHandler("Invalid content Id", 400))
  }

  const courseContent =  course?.courseData?.find((item)=> item._id.equals(contentId))
  if (!courseContent) {
    return next(new ErrorHandler("Invalid content Id", 400))
  }

  const question = courseContent?.question?.find((item)=>item._id.equals(questionId))
  if (!questionContent) {
    return next(new ErrorHandler("Invalid question Id", 400))
  }

  //create answer
  const newAnswer = {
    user : req.user,
    answer
  }
  question.questionReplies.push(newAnswer)
  await course?.save()

  if (req.user._id === question.user._id) {
    
  }else{
    const data = {
      name : question.user.name,
      title : courseContent.title

    }
    const html = await ejs.renderFile(path.join(__dirname, "../mails/question_reply.ejs"), data)
    try {
      await sendMail({
        email : question.user.email,
        subject : "Question Reply",
        template : "question_reply.ejs",
        data
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
  res.status(200).json({success : true,
    course
  })

})

//review

export const addReview = catchAsycnErroe(async(req,res,next)=>{
const userCourseList = req.user?.courses;

const courseId = req.params.id;
const courseExist = await userCourseList?.some((course)=>course._id.toString() === courseId.toString())
if (!courseExist) {
  return next(new ErrorHandler("course not found", 400))
}
const course = await Course.findById(courseId)
const {rating, review} = req.body;
const reviewData = {
  user: req.user,
  rating,
  comment : review
}
course?.reviews?.push(reviewData)
let avg = 0;
course?.reviews.forEach((rev)=>{
  avg += rev.rating
})
if (course) {
  course.ratings = avg / course.reviews.length
}

await course?.save();
const notification = {
  title : "New Review Received",
  message : `${req.user?.name} has given a review in ${course.name}`
}


res.status(200).json({
  success : true,
  course
})
})
