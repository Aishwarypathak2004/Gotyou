import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaHome } from "react-icons/fa";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
    return (
        <div className="order-success-page">

            <div className="success-card">

                <div className="success-icon">
                    <FaCheckCircle />
                </div>

                <h1>Order Placed Successfully!</h1>

                <p>
                    Thank you for shopping with <strong>GotYOU</strong>.
                    Your order has been received and is now being processed.
                    You will receive an email confirmation shortly.
                </p>

                <div className="success-info">

                    <div className="info-box">
                        <h3>Estimated Delivery</h3>
                        <span>3 - 7 Business Days</span>
                    </div>

                    <div className="info-box">
                        <h3>Payment Status</h3>
                        <span>Confirmed</span>
                    </div>

                </div>

                <div className="success-buttons">

                    <Link
                        to="/shop"
                        className="continue-btn"
                    >
                        <FaShoppingBag />
                        Continue Shopping
                    </Link>

                    <Link
                        to="/"
                        className="home-btn"
                    >
                        <FaHome />
                        Back to Home
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;