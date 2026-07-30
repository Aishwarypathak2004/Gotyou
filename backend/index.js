const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes=require('./routes/orderRoutes')
const paymentRoutes=require('./routes/paymentRoutes');
const analyticsRoutes=require('./routes/analyticsRoutes');

connectDB();

// Initialize express app
const app = express();
//cors is used to allow cross-origin requests from different domains. It is a security feature implemented by web browsers to prevent malicious websites from accessing resources on other domains without permission.
app.use(cors(
    {
        origin:['http://localhost:5173','http://127.0.0.1:5173'],
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test route
app.get("/", (req, res) => {
    res.send("API is running");
});


 // Routes
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
 

// port
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});