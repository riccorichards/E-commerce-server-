import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js"
import UserRouter from "./routes/UserRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import CartRouter from "./routes/CartRouter.js";
import OrderRouter from "./routes/OrderRouter.js";
import cors from "cors";
import StripeRouter from "./routes/StripeRouter.js";
const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log("Connection succeeded"))
	.catch((err) => console.log(err))

app.use("/auth", AuthRouter)
app.use("/user", UserRouter)
app.use("/products", ProductRouter)
app.use("/carts", CartRouter)
app.use("/orders", OrderRouter)
app.use("/checkout", StripeRouter)


app.listen(PORT, (err) => {
	err ? console.log(`We have ${err}`) : console.log(`We are successfully ran at ${PORT}`)
})