import express from "express";
import { verifyToken, veryfiTokenAndAdmin, veryfiTokenAndAuthorization } from "./tokenVerify.js";
import { OneCart, createCarts, deleteCarts, getCarts, updateCarts } from "../controller/CartController.js";

const CartRouter = express.Router()

CartRouter.get("/", veryfiTokenAndAdmin, getCarts)
CartRouter.get("/:id", veryfiTokenAndAuthorization, OneCart)

CartRouter.post("/", verifyToken, createCarts)
CartRouter.delete("/:id", veryfiTokenAndAuthorization, deleteCarts)
CartRouter.put("/:id", veryfiTokenAndAuthorization, updateCarts)

export default CartRouter