import gettingStripe from "stripe";
import express from "express";

const stripe = gettingStripe(process.env.STRIPE_KEY)
const StripeRouter = express.Router()


StripeRouter.post("/payment", async (req, res) => {
	try {

		const validUser = req.headers.authorization
		console.log(validUser.split(" ")[1])
		if (!validUser) {
			return res.status(400).json({ message: "You are not valid tp make request like this!" })
		}

		stripe.charges.create(
			{
				source: req.body.tokenId,
				amount: req.body.amount,
				currency: "usd"
			},
			(stripeErr, StripeRes) => {
				if (stripeErr) {
					console.log(stripeErr)
					res.status(500).json(stripeErr)
				} else {
					res.status(200).json(StripeRes)
				}
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "An error occurred while processing payment." });
	}
});

export default StripeRouter;

