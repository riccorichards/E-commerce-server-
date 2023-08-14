import Jwt from "jsonwebtoken"
import UserSchema from "../moduls/User.js"

export const verifyToken = (req, res, next) => {
	const Authheaders = req.headers.token

	if (!Authheaders) {
		return res.status(401).json({ message: "Authentication token not provided" })
	}

	const token = Authheaders.split(" ")[1]
	try {
		Jwt.verify(token, process.env.AUTH_PASS_KEY, async (err, token) => {
			if (err) {
				return res.status(403).json({ message: "The token is not valid!" })
			}
			const user = await UserSchema.findById(token.id)
			console.log("verifyToken")
			req.user = user

			next()
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const veryfiTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {

		if ((req.user.id === req.params.id) || req.user.isAdmin) {
			console.log("veryfiTokenAndAuthorization")
			next()
		} else {
			return res.status(403).json({ message: "You have not permission to do that!" })
		}
	})
}


export const veryfiTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			console.log("veryfiTokenAndAdmin")
			next()
		} else {
			return res.status(403).json({ message: "You have not permission to do that!" })
		}
	})
}