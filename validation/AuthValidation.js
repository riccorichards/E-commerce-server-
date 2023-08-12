import { body } from "express-validator";

export const registerValidation = [
	body("username", "Please, fulfill Username's field").isLength({ min: 1 }),
	body("email", "Invalid Email format").isEmail(),
	body("password", "Password must consist at least 8 characters").isLength({ min: 8 }),
]

export const loginValidation = [
	body("email", "Invalid Email format").isEmail(),
	body("password", "Password must consist at least 8 characters").isLength({ min: 8 }),
]