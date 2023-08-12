import bcrypt from "bcrypt";
import UserSchema from "../moduls/User.js"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		const userPassword = req.body.password;
		const salt = await bcrypt.genSalt(13);
		const passhash = await bcrypt.hash(userPassword, salt)
		//const encrypted = CryptoJS.AES.encrypt(userPassword, process.env.AUTH_PASS_KEY)

		const doc = new UserSchema({
			username: req.body.username,
			email: req.body.email,
			password: passhash
		})

		const newUser = await doc.save()
		if (!newUser) {
			return res.status(500).json({ message: "Something wenst wrong..." })
		} else {
			const accessToken = jwt.sign(
				{ id: newUser._id },
				process.env.AUTH_PASS_KEY,
				{ expiresIn: "5d" }
			)

			const { password, ...otherUserData } = newUser._doc;
			res.status(201).json({ ...otherUserData, accessToken })
		}
	} catch (e) {
		if (e.keyPattern.email > 0) {
			return res.status(500).json({ message: "Email already exist" })
		}
		res.status(500).json({ message: "Something wenst wrong..." })
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await UserSchema.findOne({ email: email })
		if (!user) {
			return res.status(400).json({ message: "Wrong credentials!" })
		}

		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.status(400).json({ message: "Wrong credentials!" })
		}

		const accessToken = jwt.sign({
			id: user._id
		},
			process.env.AUTH_PASS_KEY,
			{ expiresIn: "5d" }
		)

		const { userPasswordssword, ...otherUserData } = user._doc

		res.json({ ...otherUserData, accessToken })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: "Something wents wrong..." })
	}
}