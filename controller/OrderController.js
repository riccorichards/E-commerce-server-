import OrderSchema from "../moduls/Order.js";
import User from "../moduls/User.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const getUsersOrder = async (req, res) => {
  const userId = req.headers.userid;
  try {
    const order = await OrderSchema.find({ userId: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const createOrders = async (req, res) => {
  const orders = req.body;
  const { userId } = orders;

  const user = await User.findById(userId);
  try {
    const doc = new OrderSchema(orders);

    await doc.save();

    user.orders.push(doc._id);

    await user.save();
    res.status(201).json(doc);
  } catch (err) {
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const deleteOrders = async (req, res) => {
  const OrderId = req.params.id;
  try {
    await OrderSchema.findByIdAndDelete(OrderId);
    res.status(200).json({ message: "Order successfully deleted..." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

const orderUpdate = async (criteria, updateData) => {
  try {
    const updated = await OrderSchema.findByIdAndUpdate(
      { criteria },
      { $set: updateData },
      { new: true }
    );
    return updated;
  } catch (e) {
    throw e;
  }
};

export const updateOrders = async (req, res) => {
  const userId = req.params.id;
  const updating = req.body;

  try {
    const updated = await orderUpdate({ userId }, updating);
    if (!updated) {
      return res.status(404).json({ message: "Could not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await OrderSchema.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong..." });
  }
};
