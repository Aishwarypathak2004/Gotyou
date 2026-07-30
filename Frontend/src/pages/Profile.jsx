import React, { useEffect, useState, useContext } from "react";
import "../styles/Profile.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
    FaUserCircle,
    FaEnvelope,
    FaShoppingBag,
    FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    useEffect(() => {

        if (!user) {

            navigate("/login");

            return;

        }

        const fetchOrders = async () => {

            try {

                const res = await fetch(
                    "/api/orders/myorders",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {

                    if (res.status === 401) {

                        logout();

                        navigate("/login");

                        return;

                    }

                    throw new Error(data.message);

                }

                setOrders(data);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, [user, navigate, logout]);



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



    if (!user) return null;



    return (

        <div className="profile-container">

            <div className="profile-header">

                <div className="profile-left">

                    <div className="profile-avatar">

                        <FaUserCircle />

                    </div>

                    <div>

                        <h1>

                            Welcome,

                            <span> {user.name}</span>

                        </h1>

                        <p>

                            Manage your account and orders

                        </p>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />

                    Logout
                </button>

            </div>



            <div className="profile-info">

                <div className="info-card">

                    <FaEnvelope />

                    <div>

                        <h4>Email</h4>

                        <p>{user.email}</p>

                    </div>

                </div>

                <div className="info-card">

                    <FaShoppingBag />

                    <div>

                        <h4>Total Orders</h4>

                        <p>{orders.length}</p>

                    </div>

                </div>

                <div className="info-card">

                    <FaUserCircle />

                    <div>

                        <h4>Role</h4>

                        <p>{user.role}</p>

                    </div>

                </div>

            </div>



            <div className="orders-section">

                <div className="orders-header">

                    <h2>

                        My Orders

                    </h2>

                </div>
                {loading ? (

    <div className="loading-orders">

        <h3>Loading your orders...</h3>

    </div>

) : error ? (

    <div className="empty-orders">

        <h3>{error}</h3>

    </div>

) : orders.length === 0 ? (

    <div className="empty-orders">

        <FaShoppingBag className="empty-icon" />

        <h3>No Orders Yet</h3>

        <p>
            You haven't placed any order yet.
        </p>

        <Link
            to="/shop"
            className="shop-btn"
        >
            Start Shopping
        </Link>

    </div>

) : (

    <div className="orders-list">

        {orders.map((order) => (

            <div
                key={order._id}
                className="order-card"
            >

                <div className="order-top">

                    <div>

                        <h3>
                            Order #
                            {order._id.slice(-8).toUpperCase()}
                        </h3>

                        <p>
                            {new Date(
                                order.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                    <span
                        className={`status ${order.status.toLowerCase()}`}
                    >
                        {order.status}
                    </span>

                </div>

                <div className="order-middle">

                    <div>

                        <small>Total Amount</small>

                        <h4>
                            ₹
                            {order.totalAmount.toFixed(2)}
                        </h4>

                    </div>

                    <div>

                        <small>Items</small>

                        <h4>
                            {order.items.length}
                        </h4>

                    </div>

                    <div>

                        <small>Payment</small>

                        <h4>
                            {order.paymentId === "COD"
                                ? "Cash on Delivery"
                                : "Paid"}
                        </h4>

                    </div>

                </div>

                <div className="order-items">

                    <h4>Products</h4>

                    {order.items.map((item, index) => (

                        <div
                            key={index}
                            className="order-item"
                        >

                            <span>

                                {item.product?.name ||
                                    "Product"}

                            </span>

                            <span>

                                Qty :
                                {" "}
                                {item.qty}

                            </span>

                            <span>

                                ₹
                                {item.price}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

        ))}

    </div>

)}

</div>

</div>

);

};

export default Profile;