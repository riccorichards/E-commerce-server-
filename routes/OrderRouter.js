import express from "express";
import { verifyToken, veryfiTokenAndAdmin } from "./tokenVerify.js";
import {
  createOrders,
  deleteOrders,
  getAllOrders,
  getIncome,
  getUsersOrder,
  updateOrders,
} from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.get("/stats", veryfiTokenAndAdmin, getIncome);
OrderRouter.get("/user", verifyToken, getUsersOrder);
OrderRouter.get("/", veryfiTokenAndAdmin, getAllOrders);

OrderRouter.post("/", verifyToken, createOrders);

OrderRouter.put("/:id", veryfiTokenAndAdmin, updateOrders);

OrderRouter.delete("/:id", veryfiTokenAndAdmin, deleteOrders);

export default OrderRouter;
