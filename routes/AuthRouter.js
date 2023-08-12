import express from "express";
import { login, register } from "../controller/AuthController.js";
import { loginValidation, registerValidation } from "../validation/AuthValidation.js";
import Errorhadler from "../Errorhadler.js";

const AuthRouter = express.Router()

AuthRouter.post("/register", registerValidation, Errorhadler, register)
AuthRouter.post("/login", loginValidation, Errorhadler, login)

export default AuthRouter