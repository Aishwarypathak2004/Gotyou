import React, { useContext, useEffect, useState } from "react";
import "../styles/EditProduct.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct = async () => {

        try {

            const res = await fetch(`/api/products/${id}`);

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            setFormData({
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock,
            });

            setPreview(data.image);

        } catch (err) {

            setError(err.message);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const product = new FormData();

            product.append("name", formData.name);
            product.append("description", formData.description);
            product.append("price", formData.price);
            product.append("category", formData.category);
            product.append("stock", formData.stock);

            if (image) {

                product.append("image", image);

            }

            const res = await fetch(`/api/products/${id}`, {

                method: "PUT",

                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

                body: product,

            });

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            alert("Product Updated Successfully");

            navigate("/admin/products");

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="edit-product-page">

            <form
                className="edit-product-card"
                onSubmit={handleSubmit}
            >

                <h1>Edit Product</h1>

                {error &&

                    <div className="error-box">

                        {error}

                    </div>

                }

                <div className="image-preview">

                    <img
                        src={preview}
                        alt="Preview"
                    />

                </div>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    rows="5"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Updating..."
                        : "Update Product"}

                </button>

            </form>

        </div>

    );

};

export default EditProduct;