import React, { useState, useContext, useEffect } from "react";
import "../styles/AddProduct.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    FaCloudUploadAlt,
    FaImage,
    FaBoxOpen,
    FaTag,
    FaRupeeSign,
    FaWarehouse,
} from "react-icons/fa";

const AddProduct = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [preview, setPreview] = useState("");

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "admin") {
            navigate("/");
        }

    }, [user, navigate]);

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

        if (!image) {

            setMessage("Please select an image.");

            return;

        }

        try {

            setLoading(true);

            setMessage("");

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            data.append("image", image);

            const res = await fetch("/api/products", {

                method: "POST",

                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

                body: data,

            });

            const result = await res.json();

            if (!res.ok) {

                throw new Error(result.message);

            }

            setMessage("Product added successfully.");

            navigate("/shop");

        } catch (err) {

            setMessage(err.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="add-product-page">

            <div className="add-product-card">

                <h1>Add Product</h1>

                <p>Create a new product for your store.</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <FaBoxOpen />

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <textarea
                            rows="5"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="two-column">

                        <div className="input-group">

                            <FaRupeeSign />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaWarehouse />

                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <FaTag />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Men">
                                Men
                            </option>

                            <option value="Women">
                                Women
                            </option>

                            <option value="Shoes">
                                Shoes
                            </option>

                            <option value="Accessories">
                                Accessories
                            </option>

                        </select>

                    </div>

                    <label className="upload-box">

                        <FaCloudUploadAlt />

                        <span>
                            Upload Product Image
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            hidden
                        />

                    </label>

                    {preview && (

                        <div className="preview-box">

                            <img
                                src={preview}
                                alt="preview"
                            />

                        </div>

                    )}

                    {message && (

                        <p className="form-message">

                            {message}

                        </p>

                    )}

                    <button
                        type="submit"
                        className="publish-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Uploading..."
                            : "Publish Product"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default AddProduct;