import React, { useContext, useEffect, useState } from "react";
import "../styles/AdminProducts.css";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaBoxes,
    FaRupeeSign,
    FaTag,
} from "react-icons/fa";

const AdminProducts = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

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

        fetchProducts();

    }, [user]);



    const fetchProducts = async () => {

        try {

            const res = await fetch("/api/products");

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            setProducts(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };



    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const res = await fetch(
                `/api/products/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            setProducts((prev) =>
                prev.filter((item) => item._id !== id)
            );

        } catch (err) {

            alert(err.message);

        }

    };



    if (loading) {

        return (
            <div className="admin-products-loading">
                Loading Products...
            </div>
        );

    }



    return (

        <div className="admin-products-page">

            <div className="products-header">

                <div>

                    <h1>Manage Products</h1>

                    <p>
                        Total Products : {products.length}
                    </p>

                </div>

                <Link
                    to="/admin/addproduct"
                    className="add-product-btn"
                >
                    <FaPlus />
                    Add Product
                </Link>

            </div>

            {error &&

                <div className="error-box">

                    {error}

                </div>

            }

            <div className="products-grid">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product._id}
                    >

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                        <div className="product-content">

                            <h3>

                                {product.name}

                            </h3>

                            <div className="product-info">

                                <p>

                                    <FaRupeeSign />

                                    ₹{product.price}

                                </p>

                                <p>

                                    <FaTag />

                                    {product.category}

                                </p>

                                <p>

                                    <FaBoxes />

                                    Stock :
                                    {" "}
                                    {product.stock}

                                </p>

                            </div>

                            <div className="product-actions">

                                <Link
                                    to={`/admin/edit-product/${product._id}`}
                                    className="edit-btn"
                                >

                                    <FaEdit />

                                    Edit

                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            product._id
                                        )
                                    }
                                >

                                    <FaTrash />

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default AdminProducts;