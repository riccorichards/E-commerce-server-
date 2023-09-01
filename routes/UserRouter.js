import express from "express";
import { veryfiTokenAndAdmin, veryfiTokenAndAuthorization } from "./tokenVerify.js";
import { OneUser, deleteUser, getAllUsers, updateUser, userStats } from "../controller/UserController.js";

const UserRouter = express.Router()

UserRouter.get("/", veryfiTokenAndAdmin, getAllUsers)
UserRouter.get("/find/:id", veryfiTokenAndAdmin, OneUser)
UserRouter.get("/stats", veryfiTokenAndAdmin, userStats)

UserRouter.put("/", (veryfiTokenAndAuthorization || veryfiTokenAndAdmin), updateUser)

UserRouter.delete("/:id", veryfiTokenAndAdmin, deleteUser)
export default UserRouter
