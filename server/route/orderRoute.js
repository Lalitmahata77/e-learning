import express from "express"
import { authorizeRoles, isAthenticated } from "../middleware/authMiddleware.js"
import { allOrders, createOrder } from "../controller/orderController.js"
const router = express.Router()
router.route("/create-order").post(isAthenticated, createOrder)
router.route("/allOrder").get(isAthenticated,authorizeRoles("admin"),allOrders)
 export default router