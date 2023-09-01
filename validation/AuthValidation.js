import { body } from "express-validator";

export const registerValidation = [
	body("firstname")
		.isLength({ min: 1, max: 16 })
		.withMessage("Please provide a first name (1-16 characters)"),

	body("lastname")
		.isLength({ min: 1, max: 16 })
		.withMessage("Please provide a last name (1-16 characters)"),

	body("username")
		.isLength({ min: 1, max: 16 })
		.withMessage("Please provide a username (1-16 characters)"),

	body("email")
		.isEmail()
		.withMessage("Please provide a valid email address"),

	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long"),
];


export const loginValidation = [
	body("email")
		.isEmail()
		.withMessage("Please provide a valid email address"),

	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long"),
]