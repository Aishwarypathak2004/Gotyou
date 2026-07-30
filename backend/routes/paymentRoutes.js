const express = require('express');
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentcontroller');
const protect=require("../middlewares/authmiddleware")
const router = express.Router();

router.post("/order",protect, createPaymentOrder);
router.post("/verify",protect, verifyPayment);

module.exports=router;