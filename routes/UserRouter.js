import express from "express";
import { veryfiTokenAndAdmin, veryfiTokenAndAuthorization } from "./tokenVerify.js";
import { OneUser, deleteUser, getAllUsers, updateUser, userStats } from "../controller/UserController.js";

const UserRouter = express.Router()

UserRouter.get("/", veryfiTokenAndAdmin, getAllUsers)
UserRouter.get("/find/:id", veryfiTokenAndAdmin, OneUser)
UserRouter.get("/stats", veryfiTokenAndAdmin, userStats)

UserRouter.put("/:id", (veryfiTokenAndAdmin || veryfiTokenAndAuthorization), updateUser)

UserRouter.delete("/:id", veryfiTokenAndAuthorization, deleteUser)
export default UserRouter
