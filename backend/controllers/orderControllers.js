const Order = require("../models/Order");
const sendEmail = require("../utils/sendemail");

// =============================================
// Create Order
// =============================================
const createOrder = async (req, res) => {
  try {
    console.log("\n========== CREATE ORDER REQUEST ==========");
    console.log("User:", req.user.name, "| ID:", req.user._id);
    console.log("Request Body:", req.body);

    const { items, totalAmount, address, paymentId } = req.body;

    // Basic validation
    if (!items || items.length === 0 || !totalAmount || !address) {
      console.log("❌ Invalid order data received.");

      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    console.log("✅ Validation successful.");

    // Create order
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      address,
        paymentId: paymentId || "COD",
    });

    console.log("📝 Saving order...");

    await order.save();

    console.log("✅ Order saved successfully.");
    console.log("Order ID:", order._id);

    // Format address
    const formattedAddress = `
${address.fullName}
${address.street}
${address.city}, ${address.postalCode}
${address.country}
`.trim();

    // Email message
    const message = `
Dear ${req.user.name},

Thank you for your order!

Order Details
-------------------------
Order ID : ${order._id}
Total Amount : ₹${totalAmount}

Shipping Address
-------------------------
${formattedAddress}

Payment ID : ${paymentId || "N/A"}

We will notify you once your order has been processed.

Thank you for shopping with us!
`;

    console.log("📧 Sending confirmation email to:", req.user.email);

    await sendEmail(
      req.user.email,
      "Order Confirmation",
      message
    );

    console.log("✅ Confirmation email sent.");

    console.log("========== ORDER CREATED SUCCESSFULLY ==========\n");

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error("\n========== CREATE ORDER ERROR ==========");
    console.error(error);
    console.error("========================================\n");

    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

// =============================================
// Logged-in User Orders
// =============================================
const myOrders = async (req, res) => {
  try {

    console.log("\n========== FETCH MY ORDERS ==========");
    console.log("User:", req.user.name, "| ID:", req.user._id);

    const orders = await Order.find({
      user: req.user._id,
    }).populate("items.product", "name price");

    console.log(`✅ ${orders.length} order(s) found.`);
    console.log("=====================================\n");

    res.status(200).json(orders);

  } catch (error) {

    console.error("\n========== FETCH MY ORDERS ERROR ==========");
    console.error(error);
    console.error("===========================================\n");

    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// =============================================
// Admin - Get All Orders
// =============================================
const getOrders = async (req, res) => {
  try {

    console.log("\n========== FETCH ALL ORDERS ==========");
    console.log("Admin:", req.user.name);

    const orders = await Order.find({})
      .populate("user", "name email");

    console.log(`✅ Total Orders: ${orders.length}`);
    console.log("======================================\n");

    res.status(200).json(orders);

  } catch (error) {

    console.error("\n========== GET ORDERS ERROR ==========");
    console.error(error);
    console.error("======================================\n");

    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// =============================================
// Admin - Update Order Status
// =============================================
const updateOrderStatus = async (req, res) => {
  try {

    console.log("\n========== UPDATE ORDER STATUS ==========");
    console.log("Admin:", req.user.name);
    console.log("Order ID:", req.params.id);
    console.log("Request Body:", req.body);

    const { status } = req.body;

    if (!status) {
      console.log("❌ Status not provided.");

      return res.status(400).json({
        message: "Status is required",
      });
    }

    const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
        status,
    },
    {
        new: true,
    }
);

if (!order) {

    console.log("❌ Order not found.");

    return res.status(404).json({
        message: "Order not found",
    });

}

console.log("✅ Status Updated Successfully");
console.log("New Status:", order.status);
console.log("Updated At:", order.updatedAt);
console.log("========================================\n");

res.status(200).json({
    message: "Order status updated successfully",
    order,
});
  } catch (error) {

    console.error("\n========== UPDATE STATUS ERROR ==========");
    console.error(error);
    console.error("=========================================\n");

    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
};