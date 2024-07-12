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