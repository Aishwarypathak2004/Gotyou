const Order = require("../models/Order");
const User = require("../models/user");
const Product = require("../models/Product");

// =============================================
// Admin Dashboard Statistics
// =============================================
const getAdminStats = async (req, res) => {
  try {
    console.log("\n========== FETCH ADMIN STATS ==========");

    // -----------------------------------------
    // Count total users
    // -----------------------------------------
    const totalUsers = await User.countDocuments({});
    console.log("✅ Total Users:", totalUsers);

    // -----------------------------------------
    // Count total orders
    // -----------------------------------------
    const totalOrders = await Order.countDocuments({});
    console.log("✅ Total Orders:", totalOrders);

    // -----------------------------------------
    // Count total products
    // -----------------------------------------
    const totalProducts = await Product.countDocuments({});
    console.log("✅ Total Products:", totalProducts);

    // -----------------------------------------
    // Fetch all orders
    // -----------------------------------------
    const orders = await Order.find({});
    console.log(`✅ ${orders.length} order(s) fetched.`);

    // -----------------------------------------
    // Calculate Total Revenue
    // -----------------------------------------
    const totalRevenue = orders.reduce((acc, order) => {
      return acc + order.totalAmount;
    }, 0);

    console.log("✅ Total Revenue: ₹", totalRevenue);

    console.log("========== ADMIN STATS FETCHED ==========\n");

    // -----------------------------------------
    // Send Response
    // -----------------------------------------
    res.status(200).json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
    });

  } catch (error) {

    console.error("\n========== ADMIN STATS ERROR ==========");
    console.error(error);
    console.error("=======================================\n");

    res.status(500).json({
      message: "There was an error loading analytics.",
      error: error.message,
    });
  }
};

module.exports = getAdminStats;