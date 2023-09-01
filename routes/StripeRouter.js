import gettingStripe from "stripe";
import express from "express";

const stripe = gettingStripe("sk_test_51Nf3pXDzzupGtRHjVZ9a0wrOaJLBGPZUcyMy3AvPmLdykfej1tTvM5lZFWYxMfyur4N8LkroV619SrrJQRxNWsGM00CdAqjUcv")
const StripeRouter = express.Router()


StripeRouter.post("/payment", async (req, res) => {
	try {
		await stripe.charges.create(
			{
				source: req.body.tokenId,
				amount: req.body.amount,
				currency: "usd"
			},
			(stripeErr, StripeRes) => {
				if (stripeErr) {
					return res.status(500).json(stripeErr)
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

