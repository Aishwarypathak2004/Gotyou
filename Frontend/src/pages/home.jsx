import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import "../styles/home.css";
const Home = () => {
  // Stores all featured products
  const [products, setProducts] = useState([]);

  // Tracks whether data is still being fetched
  const [loading, setLoading] = useState(true);

  // Runs only once when the component is first rendered
  useEffect(() => {
    // Function to fetch products from the backend
    const fetchProducts = async () => {
      try {
        // Send GET request to backend API
        const res = await fetch("/api/products");

        // Convert response into JavaScript object
        const data = await res.json();

        // Store only the first 4 products as featured products
        setProducts(data.slice(0, 4));
      } catch (error) {
        // Print error if request fails
        console.error("Error fetching products:", error);
      } finally {
        // Stop loading whether request succeeds or fails
        setLoading(false);
      }
    };

    // Call the function
    fetchProducts();

    // Empty dependency array means this effect runs only once
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-banner">
        <h1>WELCOME TO GOTYOU</h1>

        <p>
          Your one-stop market to satisfy your self-love craving at a minimal
          price.
        </p>
      </div>

      {/* Section Heading */}
      <h2>Featured Products</h2>

      {/* Show loading text until products are fetched */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        // Display featured products after loading finishes
        <div className="product-grid">
          {products.map((product) => (
            // Render one ProductCard for each product
            <ProductCard
              key={product._id} // Unique key for React
              product={product} // Pass product object as prop
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;