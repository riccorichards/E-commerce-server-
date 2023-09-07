import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
