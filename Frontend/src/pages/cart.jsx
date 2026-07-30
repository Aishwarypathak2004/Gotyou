import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import "../styles/Cart.css";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.cartItems);



    const handleIncrease = (item) => {

        if (item.qty < item.stock) {

            dispatch(

                addToCart({

                    ...item,

                    qty: item.qty + 1,

                })

            );

        }

    };



    const handleDecrease = (item) => {

        if (item.qty > 1) {

            dispatch(

                addToCart({

                    ...item,

                    qty: item.qty - 1,

                })

            );

        }

    };



    const handleRemove = (_id) => {

        dispatch(removeFromCart(_id));

    };



    const totalItems = cartItems.reduce(

        (acc, item) => acc + item.qty,

        0

    );



    const subtotal = cartItems.reduce(

        (acc, item) => acc + item.price * item.qty,

        0

    );



    const delivery = subtotal > 999 || subtotal === 0 ? 0 : 99;

    const total = subtotal + delivery;



    if (cartItems.length === 0) {

        return (

            <div className="empty-cart">

                <h2>Your Cart is Empty</h2>

                <p>

                    Looks like you haven't added anything yet.

                </p>

                <Link to="/shop" className="shop-btn">

                    Continue Shopping

                </Link>

            </div>

        );

    }



    return (

        <div className="cart-container">

            <h1>

                Shopping Cart

                <span>

                    ({totalItems} Items)

                </span>

            </h1>

            <div className="cart-wrapper">

                <div className="cart-items">

                    {

                        cartItems.map((item) => (

                            <div

                                className="cart-item"

                                key={item._id}

                            >

                                <div className="cart-image">

                                    <img

                                        src={item.image}

                                        alt={item.name}

                                    />

                                </div>

                                <div className="cart-details">

                                    <h3>

                                        {item.name}

                                    </h3>

                                    <p className="category">

                                        {item.category}

                                    </p>

                                    <h4>

                                        ₹{Number(item.price).toLocaleString("en-IN")}

                                    </h4>

                                    <p className="stock">

                                        {item.stock > 0
                                            ? `In Stock (${item.stock})`
                                            : "Out of Stock"}

                                    </p>

                                    <div className="qty-box">                                        <button
                                            onClick={() => handleDecrease(item)}
                                            disabled={item.qty === 1}
                                        >
                                            -
                                        </button>

                                        <span>{item.qty}</span>

                                        <button
                                            onClick={() => handleIncrease(item)}
                                            disabled={item.qty >= item.stock}
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className="cart-actions">

                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemove(item._id)}
                                        >
                                            Remove
                                        </button>

                                        <h4 className="item-total">

                                            ₹{Number(item.price * item.qty).toLocaleString("en-IN")}

                                        </h4>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

                <div className="cart-summary">

                    <h2>Order Summary</h2>

                    <div className="summary-row">

                        <span>Subtotal</span>

                        <span>

                            ₹{Number(subtotal).toLocaleString("en-IN")}

                        </span>

                    </div>

                    <div className="summary-row">

                        <span>Delivery</span>

                        <span>

                            {

                                delivery === 0

                                    ? "FREE"

                                    : `₹${delivery}`

                            }

                        </span>

                    </div>

                    <hr />

                    <div className="summary-total">

                        <span>Total</span>

                        <span>

                            ₹{Number(total).toLocaleString("en-IN")}

                        </span>

                    </div>

                    <button
                        className="checkout-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed To Checkout
                    </button>

                    <Link
                        to="/shop"
                        className="continue-btn"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Cart;