import React, { useContext, useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    FaBoxOpen,
    FaShoppingCart,
    FaUsers,
    FaRupeeSign,
    FaPlusCircle,
    FaClipboardList,
    FaTachometerAlt,
    FaStore,
} from "react-icons/fa";

const AdminDashboard = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);

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

        fetchStats();

    }, [user]);

    const fetchStats = async () => {

        try {

            const res = await fetch("/api/analytics", {

                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            setStats(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading Dashboard...
            </div>
        );

    }

    return (

        <div className="dashboard-page">

            <div className="dashboard-banner">

                <div>

                    <h1>
                        <FaTachometerAlt />
                        Admin Dashboard
                    </h1>

                    <p>
                        Welcome back,
                        <span> {user.name}</span>
                    </p>

                </div>

            </div>

            {error &&

                <div className="dashboard-error">

                    {error}

                </div>

            }

            <div className="stats-grid">

                <div className="stat-card">

                    <FaShoppingCart />

                    <h4>Total Orders</h4>

                    <h2>{stats?.totalOrders || 0}</h2>

                </div>

                <div className="stat-card">

                    <FaBoxOpen />

                    <h4>Total Products</h4>

                    <h2>{stats?.totalProducts || 0}</h2>

                </div>

                <div className="stat-card">

                    <FaUsers />

                    <h4>Total Users</h4>

                    <h2>{stats?.totalUsers || 0}</h2>

                </div>

                <div className="stat-card">

                    <FaRupeeSign />

                    <h4>Total Revenue</h4>

                    <h2>

                        ₹{stats?.totalRevenue?.toFixed(2) || "0.00"}

                    </h2>

                </div>

            </div>

            <div className="quick-actions">

                <h2>Quick Actions</h2>

                <div className="action-grid">

                    <button
                        onClick={() =>
                            navigate("/admin/add-product")
                        }
                    >

                        <FaPlusCircle />

                        Add Product

                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >

                        <FaBoxOpen />

                        Manage Products

                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                    >

                        <FaClipboardList />

                        Manage Orders

                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/users")
                        }
                    >

                        <FaUsers />

                        Manage Users

                    </button>

                    <button
                        onClick={() =>
                            navigate("/shop")
                        }
                    >

                        <FaStore />

                        View Store

                    </button>

                </div>

            </div>

            <div className="dashboard-note">

                <h3>Administrator Panel</h3>

                <p>

                    Welcome to the GotYOU Admin Dashboard.
                    From here you can manage products,
                    monitor customer orders,
                    track users,
                    check revenue,
                    and keep your store running efficiently.

                </p>

            </div>

        </div>

    );

};

export default AdminDashboard;