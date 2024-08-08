import express from "express"
import { authorizeRoles, isAthenticated } from "../middleware/authMiddleware.js"
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controller/analyticsController.js"
const router = express.Router()

router.route("/userAnalytics").get(isAthenticated,authorizeRoles("admin"),getUserAnalytics)

router.route("/courseAnalytics").get(isAthenticated,authorizeRoles("admin"),getCourseAnalytics)
router.route("/orderAnalytics").get(isAthenticated,authorizeRoles("admin"),getOrderAnalytics)
export default router

