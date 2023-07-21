import Razorpay from "razorpay";
import crypto from "crypto";
import BookingModel from "../models/BookingModel.js";
import 'dotenv/config'


let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function paymentOrder(req, res) {
  try {
    const { price } = req.body;
    var options = {
      amount: price * 100,
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        res.json({ err: true, message: "server error" });
      } else {
        res.json({ err: false, order });
      }
    });
  } catch (error) {
    res.json({ err: true, message: "server error", error });
  }
}

export async function verifyPayment(req, res) {
  try {
    const {
      response,
      selectedDate,
      guideId,
      packageId,
      userId,
      price,
      guestes,
      days
    } = req.body;

    let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === response.razorpay_signature) {
      const booking = await BookingModel.create({
        bookedDate:selectedDate,
        bookEndDate:new Date(new Date().setDate(new Date(selectedDate).getDate() + days+2)),
        guideId,
        payment: response,
        packageId,
        userId,
        price,
        guestes,
      });
      return res.json({
        err: false,
        booking,
      });
    } else {
      return res.json({
        err: true,
        message: "payment verification failed",
      });
    }
  } catch (error) {
    res.json({ error, err: true, message: "somethin went wrong" });
  }
}
