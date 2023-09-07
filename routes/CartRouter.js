import express from "express";
import { verifyToken, veryfiTokenAndAdmin, veryfiTokenAndAuthorization } from "./tokenVerify.js";
import { getUsersCarts, createCarts, deleteCarts, getCarts, updateCarts } from "../controller/CartController.js";

const CartRouter = express.Router()

CartRouter.get("/", veryfiTokenAndAdmin, getCarts)
CartRouter.get("/:userId", verifyToken, getUsersCarts)

CartRouter.post("/", verifyToken, createCarts)
CartRouter.delete("/:id", verifyToken, deleteCarts)
CartRouter.put("/:id", veryfiTokenAndAuthorization, updateCarts)

export default CartRouter