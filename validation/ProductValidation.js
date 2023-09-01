import { body } from "express-validator";

export const productsValidation = [
	body("title", "Please, fulfill Username's field").isLength({ min: 1 }),
	body("desc", "Please, fulfill description's field").isLength({ min: 1 }),
	body("img", "Invalid Image format").isLength({ min: 1 }),
	body("category", "Please, fulfill Categories' field").optional().isArray(),
	body("size", "Please, fulfill Size's field").optional().isArray(),
	body("color", "Please, fulfill Color's field").optional().isArray(),
	body("price", "Required Number format").isNumeric(),
]


export const forUpdateproductsValidation = [
	body("title", "Please, fulfill Username's field").optional().isLength({ min: 1 }),
	body("desc", "Please, fulfill description's field").optional().isLength({ min: 1 }),
	body("img", "Invalid Image format").isLength({ min: 1 }),
	body("category", "Please, fulfill Categories' field").optional().isArray(),
	body("size", "Please, fulfill Size's field").optional().isArray(),
	body("color", "Please, fulfill Color's field").optional().isArray(),
	body("price", "Required Number format").optional().isNumeric(),
]
