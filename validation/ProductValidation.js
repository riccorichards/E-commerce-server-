import { body } from "express-validator";

export const productsValidation = [
	body("title", "Please, fulfill Username's field").isLength({ min: 1 }),
	body("desc", "Please, fulfill description's field").isLength({ min: 1 }),
	body("img", "Invalid Image format").isURL(),
	body("category", "Please, fulfill Categories' field").optional().isArray(),
	body("size", "Here should be only Simbol").optional(),
	body("color", "Password must consist at least 8 characters").optional(),
	body("price", "Required Number format").isNumeric(),
]


export const forUpdateproductsValidation = [
	body("title", "Please, fulfill Username's field").optional().isLength({ min: 1 }),
	body("desc", "Please, fulfill description's field").optional().isLength({ min: 1 }),
	body("img", "Invalid Image format").optional().isURL(),
	body("category", "Please, fulfill Categories' field").optional().optional().isArray(),
	body("size", "Here should be only Simbol").optional().optional(),
	body("color", "Password must consist at least 8 characters").optional().optional(),
	body("price", "Required Number format").optional().isNumeric(),
]
