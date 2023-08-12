import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js"
import UserRouter from "./routes/UserRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
const app = express()
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log("Connection succeeded"))
	.catch((err) => console.log(err))

app.use("/auth", AuthRouter)
app.use("/user", UserRouter)
app.use("/products", ProductRouter)

app.listen(PORT, (err) => {
	err ? console.log(`We have ${err}`) : console.log(`We are successfully ran at ${PORT}`)
})