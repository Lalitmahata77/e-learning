import express from "express"
import { authorizeRoles, isAthenticated } from "../middleware/authMiddleware.js"
import { notificatons, updateNotification } from "../controller/notificationController.js"
const router = express.Router()

router.route("/notifications").get(isAthenticated,authorizeRoles("admin"),notificatons)
router.route("/updateNotification/:id").put(isAthenticated,authorizeRoles("admin"),updateNotification)
export default router