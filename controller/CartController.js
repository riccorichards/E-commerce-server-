import CartsSchema from "../moduls/Cart.js";
import User from "../moduls/User.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await CartsSchema.find();
    res.status(200).json(carts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const getUsersCarts = async (req, res) => {
  const { userId } = req.params;
  try {
		const user = await User.findById(userId);
		

    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const createCarts = async (req, res) => {
	const carts = req.body;
  try {
    const doc = new CartsSchema(carts);

    await doc.save();

    res.status(201).json(doc);
  } catch (err) {
    if (err.keyPattern.title > 0) {
      return res
        .status(404)
        .json({ message: "Cart the same name is alredy exist" });
    }
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const deleteCarts = async (req, res) => {
  const cartId = req.params.id;
  try {
    await CartsSchema.findByIdAndDelete(cartId);
    res.status(200).json({ message: "Cart successfully deleted..." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};

export const updateCarts = async (req, res) => {
  const cartId = req.params.id;
  const updating = req.body;
  try {
    const updated = await CartsSchema.findByIdAndUpdate(
      cartId,
      {
        $set: updating,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something wents wrong..." });
  }
};
