import express from "express"
import { authorizeRoles, isAthenticated } from "../middleware/authMiddleware.js"
import { createLayout, getLayoutByType, updateLayout } from "../controller/layoutController.js"
const router = express.Router()

router.route("/createLayout").post(isAthenticated,authorizeRoles("admin"),createLayout)
router.route("/updateCategoryLayout").put(isAthenticated,authorizeRoles("admin"), updateLayout)
router.route("/layouts").get(getLayoutByType)
export default router