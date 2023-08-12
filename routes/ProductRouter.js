import express from "express";
import { OneProduct, createProducts, deleteProducts, getProducts, updateProducts } from "../controller/ProductsController.js";
import { veryfiTokenAndAdmin } from "./tokenVerify.js";
import Errorhadler from "../Errorhadler.js";
import { forUpdateproductsValidation, productsValidation } from "../validation/ProductValidation.js";

const ProductRouter = express.Router()

ProductRouter.get("/", getProducts)
ProductRouter.get("/:id", OneProduct)

ProductRouter.post("/", veryfiTokenAndAdmin, productsValidation, Errorhadler, createProducts)
ProductRouter.delete("/:id", veryfiTokenAndAdmin, deleteProducts)
ProductRouter.put("/:id", veryfiTokenAndAdmin, forUpdateproductsValidation, Errorhadler, updateProducts)

export default ProductRouter
