import React, { useState, useContext } from "react";
import "../styles/Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {

    const { user } = useContext(AuthContext);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.cartItems);

    const [loading, setLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState("razorpay");

    const [address, setAddress] = useState({

        fullName: "",

        phone: "",

        street: "",

        city: "",

        state: "",

        postalCode: "",

        country: "India",

    });



    const handleChange = (e) => {

        setAddress({

            ...address,

            [e.target.name]: e.target.value,

        });

    };



    const subtotal = cartItems.reduce(

        (acc, item) => acc + item.price * item.qty,

        0

    );



    const delivery = subtotal > 999 || subtotal === 0 ? 0 : 99;

    const totalAmount = subtotal + delivery;



    if (!user) {

        return <Navigate to="/login" replace />;

    }



   if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
}



    const placeCODOrder = async () => {
    try {
        setLoading(true);

        // Convert cart items to order items
        const orderItems = cartItems.map((item) => ({
            product: item._id,
            qty: item.qty,
            price: item.price,
        }));

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                items: orderItems,
                totalAmount,
                address,
                paymentId: "COD",
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }
        navigate("/ordersuccess", { replace: true });

setTimeout(() => {
    dispatch(clearCart());
}, 100);
       
    } catch (err) {
        alert(err.message);
    } finally {
        setLoading(false);
    }
};


    const handleRazorpay = async () => {

        try {

            setLoading(true);

            const orderRes = await fetch(

                "/api/payments/order",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${user.token}`,

                    },

                    body: JSON.stringify({

                        amount: totalAmount,

                    }),

                }

            );



            const order = await orderRes.json();



            if (!orderRes.ok) {

                throw new Error(order.message);

            }



            const options = {                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                name: "GotYOU",

                description: "Order Payment",

                order_id: order.id,

                prefill: {

                    name: address.fullName,

                    email: user.email,

                    contact: address.phone,

                },

                theme: {

                    color: "#2563eb",

                },

              handler: async function (response) {

    try {

        // Convert cart items into the format required by Order schema
        const orderItems = cartItems.map((item) => ({
            product: item._id,
            qty: item.qty,
            price: item.price,
        }));

        const verifyRes = await fetch(
            "/api/payments/verify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },

                body: JSON.stringify({

                    razorpay_order_id: response.razorpay_order_id,

                    razorpay_payment_id: response.razorpay_payment_id,

                    razorpay_signature: response.razorpay_signature,

                    items: orderItems,

                    totalAmount,

                    address,

                }),

            }
        );

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok) {
            throw new Error(verifyData.message);
        }
        navigate("/ordersuccess", { replace: true });

setTimeout(() => {
    dispatch(clearCart());
}, 100);
       

    } catch (err) {

        alert(err.message);

    }

},

            };



            const razorpay = new window.Razorpay(options);

            razorpay.open();

        }

        catch (err) {

            alert(err.message);

        }

        finally {

            setLoading(false);

        }

    };



    const handleSubmit = (e) => {

        e.preventDefault();

        if (paymentMethod === "cod") {

            placeCODOrder();

        }

        else {

            handleRazorpay();

        }

    };



    return (

        <div className="checkout-container">

            <div className="checkout-wrapper">

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Shipping Address</h2>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={address.fullName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={address.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={address.street}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={address.postalCode}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={address.country}
                        onChange={handleChange}
                        required
                    />

                    <div className="payment-method">

                        <h3>Payment Method</h3>

                        <label>

                            <input
                                type="radio"
                                value="razorpay"
                                checked={paymentMethod === "razorpay"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            Pay with Razorpay

                        </label>

                        <label>

                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            Cash on Delivery

                        </label>

                    </div>

                </form>

                <div className="checkout-summary">

                    <h2>Order Summary</h2>

                    {

                        cartItems.map((item) => (

                            <div
                                className="summary-item"
                                key={item._id}
                            >

                                <span>

                                    {item.name} × {item.qty}

                                </span>

                                <span>

                                    ₹{Number(
                                        item.price * item.qty
                                    ).toLocaleString("en-IN")}

                                </span>

                            </div>

                        ))

                    }

                    <hr />

                    <div className="summary-row">

                        <span>Subtotal</span>

                        <span>

                            ₹{Number(subtotal).toLocaleString("en-IN")}

                        </span>

                    </div>

                    <div className="summary-row">

                        <span>Delivery</span>

                        <span>

                            {delivery === 0
                                ? "FREE"
                                : `₹${delivery}`}

                        </span>

                    </div>

                    <div className="summary-total">

                        <span>Total</span>

                        <span>

                            ₹{Number(totalAmount).toLocaleString("en-IN")}

                        </span>

                    </div>

                    <button
                        className="place-order-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Processing..."

                                : paymentMethod === "cod"

                                ? "Place Order"

                                : "Pay Now"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Checkout;