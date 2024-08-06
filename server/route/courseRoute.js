import express from "express"
import { authorizeRoles, isAthenticated } from "../middleware/authMiddleware.js"
import { addAnswer, addQuestions, addReview, editCourse, getAllCourses, getSingleCourse, getSingleCoursePurchasing, uploadCourse } from "../controller/courseController.js"
const router = express.Router()

router.route("/upload_course").post(isAthenticated,authorizeRoles("admin"), uploadCourse)
router.route("/edit_course/:id").put(isAthenticated, authorizeRoles("admin"), editCourse)
router.route("/singleCourse/:id").get(getSingleCourse)
router.route("/allCourses").get(getAllCourses)
router.route("/singleCourse/:id").get(isAthenticated, getSingleCoursePurchasing)
router.route("/addQuestion").put(isAthenticated, addQuestions)
router.route("/addAnswer").put(isAthenticated,addAnswer)
router.route("/addReview/:id").put(isAthenticated,addReview)
export default router