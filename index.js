import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import UserRouter from "./routes/UserRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import CartRouter from "./routes/CartRouter.js";
import OrderRouter from "./routes/OrderRouter.js";
import cors from "cors";
import multer from "multer";
import { veryfiTokenAndAdmin } from "./routes/tokenVerify.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection succeeded"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/upload",
  veryfiTokenAndAdmin,
  upload.single("image"),
  async (req, res) => {
    res.json({
      url: `/uploads/${req.file?.originalname}`,
    });
  }
);

app.post("/user-upload", upload.single("image"), async (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  });
});

app.use("/uploads", express.static("uploads"));
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/products", ProductRouter);
app.use("/carts", CartRouter);
app.use("/orders", OrderRouter);

app.listen(PORT, (err) => {
  err
    ? console.log(`We have ${err}`)
    : console.log(`We are successfully ran at ${PORT}`);
});
