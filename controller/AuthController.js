import bcrypt from "bcrypt";
import UserSchema from "../moduls/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const userPassword = req.body.password;
    const salt = await bcrypt.genSalt(13);
    const passhash = await bcrypt.hash(userPassword, salt);
    //const encrypted = CryptoJS.AES.encrypt(userPassword, process.env.AUTH_PASS_KEY)

    const doc = new UserSchema({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: passhash,
      profileUrl: req.body.profileUrl,
    });

    const newUser = await doc.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: "Something wenst wrong..." });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const userPassword = req.body.password;

    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const validPassword = await bcrypt.compare(userPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.AUTH_PASS_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...otherUserData } = user._doc;

    res.json({ ...otherUserData, accessToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something wents wrong..." });
  }
};
