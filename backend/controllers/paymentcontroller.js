const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const Order = require("../models/Order");
const sendEmail = require("../utils/sendemail");

// =======================================================
// Create Razorpay Order
// =======================================================
const createPaymentOrder = async (req, res) => {
  try {
    console.log("\n========== CREATE PAYMENT ORDER ==========");

    const { amount } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required",
      });
    }

    // Razorpay Instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Razorpay Order Options
    const options = {
      amount: amount * 100, // Convert ₹ to Paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    // Create Razorpay Order
    const order = await instance.orders.create(options);

    console.log("✅ Razorpay Order Created");
    console.log("Order ID :", order.id);
    console.log("Amount   :", order.amount);
    console.log("Receipt  :", order.receipt);

    console.log("=========================================\n");

    return res.status(200).json(order);

  } catch (error) {

    console.error("========== PAYMENT ORDER ERROR ==========");
    console.error(error);
    console.error("=========================================\n");

    return res.status(500).json({
      message: "Error creating payment order",
      error: error.message,
    });
  }
};

// =======================================================
// Verify Payment & Create Order
// =======================================================
const verifyPayment = async (req, res) => {
  try {

    console.log("\n========== VERIFY PAYMENT ==========");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      address,
    } = req.body;

    // Generate Signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("Received Signature :", razorpay_signature);
    console.log("Generated Signature:", generated_signature);

    // Verify Signature
    if (generated_signature !== razorpay_signature) {

      console.log("❌ Payment Verification Failed");

      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    console.log("✅ Payment Verified Successfully");

    // =====================================
    // Create Order
    // =====================================
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      address,
      paymentId: razorpay_payment_id,
    });

    console.log("✅ Order Created");
    console.log("Order ID:", order._id);

    // =====================================
    // Prepare Address
    // =====================================
    const formattedAddress = `
${address.fullName}
${address.street}
${address.city}, ${address.postalCode}
${address.country}
`.trim();

    // =====================================
    // Send Confirmation Email
    // =====================================
    const message = `
Dear ${req.user.name},

Thank you for shopping with us.

Your payment has been received successfully.

--------------------------------------
Order ID      : ${order._id}
Payment ID    : ${razorpay_payment_id}
Amount Paid   : ₹${totalAmount}
--------------------------------------

Shipping Address

${formattedAddress}

We will notify you once your order has been shipped.

Thank you for choosing us.
`;

    console.log("📧 Sending Confirmation Email...");

    await sendEmail(
      req.user.email,
      "Order Confirmation",
      message
    );

    console.log("✅ Confirmation Email Sent");

    console.log("=================================\n");

    return res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      order,
    });

  } catch (error) {

    console.error("========== VERIFY PAYMENT ERROR ==========");
    console.error(error);
    console.error("==========================================\n");

    return res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};