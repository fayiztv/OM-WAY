import Razorpay from "razorpay";
import crypto from "crypto";
import BookingModel from "../models/BookingModel.js";
import { log } from "console";

let instance = new Razorpay({
  key_id: "rzp_test_O512t3FLY9WNji",
  key_secret: "68JveSDBr0P5v5mohPayW9FM",
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
        console.log(err);
        res.json({ err: true, message: "server error" });
      } else {
        res.json({ err: false, order });
      }
    });
  } catch (error) {
    res.json({ err: true, message: "server error", error });
    console.log(error);
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
    } = req.body;


    let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", "68JveSDBr0P5v5mohPayW9FM")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === response.razorpay_signature) {
      const booking = await BookingModel.create({
        bookedDate:selectedDate,
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
    console.log(error);
    res.json({ error, err: true, message: "somethin went wrong" });
  }
}
