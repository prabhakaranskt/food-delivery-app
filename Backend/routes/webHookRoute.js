import Stripe from "stripe";
import express from "express";
import { placeOrder, stripeAfterPay } from "../controllers/orderController.js";
import orderModel from "../models/orderModel.js";

const webRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

webRouter.post(
  "/webhook/:id",
  express.raw({ type: "application/json" }),
  stripeAfterPay
);

webRouter.get("/check-session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    const orderId = session.metadata.orderId;
    if (session.payment_status === "paid") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
    }
    res.json({
      paid: session.payment_status === "paid",
      orderId: session.metadata.orderId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving session" });
  }
});

export default webRouter;
