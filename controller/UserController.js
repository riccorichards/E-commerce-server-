import UserSchema from "../moduls/User.js"
import bcrypt from 'bcrypt';


export const getAllUsers = async (req, res) => {
	const query = req.query.new
	try {
		const users = query ? await UserSchema.find().sort({ _id: -1 }).limit(5) : await UserSchema.find()
		const withoutAdmin = users.filter(user => user.isAdmin === false)
		res.status(200).json(withoutAdmin)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const OneUser = async (req, res) => {
	try {
		const userId = req.params.id
		if (!userId) {
			return res.status(400).json({ message: "Could not fount the user" })
		}

		const user = await UserSchema.findById(userId)

		const { password, ...other } = user._doc

		res.json(other)

	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const updateUser = async (req, res) => {
	const { userId, password, username, email } = req.body
	let newPassword;
	if (password) {
		const salt = await bcrypt.genSalt(13)
		newPassword = await bcrypt.hash(password, salt)
	}

	const requestForUpdate = {};

	if (username) {
		requestForUpdate.username = username;
	}

	if (email) {
		requestForUpdate.email = email;
	}

	if (password) {
		requestForUpdate.password = newPassword;
	}

	if (req.body.profileUrl) {
		requestForUpdate.profileUrl = req.body.profileUrl;
	}
	try {
		const updateUser = await UserSchema.findByIdAndUpdate(userId, {
			$set: requestForUpdate
		}, { new: true })

		res.json(updateUser)

	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const deleteUser = async (req, res) => {
	try {
		await UserSchema.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: "User successfully deleted..." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const userStats = async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
	try {
		const data = await UserSchema.aggregate([
			{
				$match: { createdAt: { $gte: lastYear } }
			},
			{
				$project: {
					month: { $month: "$createdAt" }
				}
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 }
				}
			}
		]);
		res.json(data)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}