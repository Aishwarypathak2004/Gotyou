import React, { useContext, useEffect, useState } from "react";
import "../styles/AdminOrders.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    FaBoxOpen,
    FaUser,
    FaCalendarAlt,
    FaRupeeSign,
} from "react-icons/fa";

const AdminOrders = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "admin") {
            navigate("/");
            return;
        }

        fetchOrders();

    }, [user]);



    const fetchOrders = async () => {

        try {

            const res = await fetch("/api/orders", {

                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            setOrders(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };



    const updateStatus = async (id, status) => {

        try {

            const res = await fetch(
                `/api/orders/${id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },

                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            if (!res.ok) {

                throw new Error("Unable to update status");

            }

            setOrders((prev) =>
                prev.map((order) =>
                    order._id === id
                        ? { ...order, status }
                        : order
                )
            );

        } catch (err) {

            alert(err.message);

        }

    };



    if (loading) {

        return (
            <div className="admin-orders-page">
                <h2>Loading Orders...</h2>
            </div>
        );

    }



    return (

        <div className="admin-orders-page">

            <div className="orders-header">

                <div>

                    <h1>Manage Orders</h1>

                    <p>
                        Total Orders : {orders.length}
                    </p>

                </div>

            </div>

            {error && (

                <div className="error-box">

                    {error}

                </div>

            )}

            <div className="orders-grid">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="order-card"
                    >

                        <div className="card-top">

                            <h3>

                                #{order._id.slice(-8)}

                            </h3>

                            <span
                                className={`status ${order.status.toLowerCase()}`}
                            >
                                {order.status}
                            </span>

                        </div>

                        <div className="order-info">

                            <p>

                                <FaUser />

                                {order.user?.name ||
                                    "Unknown User"}

                            </p>

                            <p>

                                <FaCalendarAlt />

                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}

                            </p>

                            <p>

                                <FaRupeeSign />

                                ₹
                                {order.totalAmount.toFixed(
                                    2
                                )}

                            </p>

                            <p>

                                <FaBoxOpen />

                                {order.items.length} Items

                            </p>

                        </div>

                        <div className="status-update">

                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                            >

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="processing">
                                    Processing
                                </option>

                                <option value="shipped">
                                    Shipped
                                </option>

                                <option value="delivered">
                                    Delivered
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default AdminOrders;