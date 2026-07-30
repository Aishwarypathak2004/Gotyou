import React, { useEffect, useState } from "react";
import "../styles/ProductDetail.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [qty, setQty] = useState(1);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await fetch(`/api/products/${id}`);

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }

                setProduct(data);

            }

            catch (err) {

                setError(err.message);

            }

            finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);



    const increaseQty = () => {

        if (qty < product.stock) {

            setQty(qty + 1);

        }

    };



    const decreaseQty = () => {

        if (qty > 1) {

            setQty(qty - 1);

        }

    };



    const handleAddToCart = () => {

        dispatch(

            addToCart({

                ...product,

                qty

            })

        );

    };



    if (loading) {

        return <h2 className="loading">Loading Product...</h2>;

    }



    if (error) {

        return <h2 className="error">{error}</h2>;

    }



    return (

        <div className="product-details">

            <div className="product-image">

                <img
                    src={product.imageUrl}
                    alt={product.name}
                />

            </div>

            <div className="product-info">

                <span className="category">

                    {product.category}

                </span>

                <h1>

                    {product.name}

                </h1>

                <h2>

                    ₹ {Number(product.price).toLocaleString("en-IN")}

                </h2>

                <p>

                    {product.description}

                </p>

                <div className="stock">

                    {
                        product.stock > 0 ?

                        <span className="available">

                            In Stock ({product.stock})

                        </span>

                        :

                        <span className="not-available">

                            Out of Stock

                        </span>
                    }

                </div>

                <div className="quantity">                    <button
                        onClick={decreaseQty}
                        disabled={qty === 1}
                    >
                        -
                    </button>

                    <span>{qty}</span>

                    <button
                        onClick={increaseQty}
                        disabled={qty === product.stock}
                    >
                        +
                    </button>

                </div>

                <button
                    className="cart-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {product.stock > 0
                        ? "Add To Cart"
                        : "Out of Stock"}
                </button>

            </div>

        </div>

    );

};

export default ProductDetails;