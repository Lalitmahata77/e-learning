import express from "express"
import { allUser, deleteUser, getUser, login, logout, register, socialAuth, updatePassword, updateUser, updateUserRole, uploadAvatar, userDetails } from "../controller/userController.js"
import { authorizeRoles, isAthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/getuser").get(isAthenticated,getUser)
router.route("/alluser").get(isAthenticated,authorizeRoles("admin"),allUser)
router.route("/userdetails/:id").get(isAthenticated, authorizeRoles("admin"),userDetails)
router.route("/social-auth").post(socialAuth)
router.route("/password/update").put(isAthenticated, updatePassword)
router.route("/me/update").put(isAthenticated,updateUser)
router.route("/me/upload_avatar").put(isAthenticated, uploadAvatar)
router.route("/updateUserRole").put(isAthenticated,authorizeRoles("admin"),updateUserRole)
router.route("/delete/:id").delete(isAthenticated,authorizeRoles("admin"),deleteUser)
export default router