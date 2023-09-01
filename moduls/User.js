import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: false
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	profileUrl: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order"
		}
	],
	isAdmin: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

export default mongoose.model("User", UserSchema)