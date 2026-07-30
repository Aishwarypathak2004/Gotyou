import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";

const Shop = () => {

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");



    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await fetch("/api/products");

                const data = await res.json();

                if (!res.ok) {

                    throw new Error(data.message);

                }

                setProducts(data);

                setFilteredProducts(data);

            }

            catch (err) {

                setError(err.message);

            }

            finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);




    useEffect(() => {

        let tempProducts = [...products];



        if (category !== "All") {

            tempProducts = tempProducts.filter(

                (product) =>

                    product.category === category

            );

        }



        if (search.trim() !== "") {

            tempProducts = tempProducts.filter(

                (product) =>

                    product.name

                        .toLowerCase()

                        .includes(search.toLowerCase())

            );

        }



        setFilteredProducts(tempProducts);

    }, [search, category, products]);




    const categories = [

        "All",

        ...new Set(

            products.map((product) => product.category)

        ),

    ];



    if (loading) {

        return (

            <h2 className="loading">

                Loading Products...

            </h2>

        );

    }



    if (error) {

        return (

            <h2 className="error">

                {error}

            </h2>

        );

    }



    return (

        <div className="shop-container">

            <div className="shop-header">

                <h1>Shop</h1>

                <p>

                    Discover our latest products.

                </p>

            </div>



            <div className="shop-filters">

                <input

                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                    className="search-input"

                />



                <select

                    value={category}

                    onChange={(e) =>

                        setCategory(e.target.value)

                    }

                    className="category-select"

                >

                    {
                        categories.map((cat) => (

                            <option

                                key={cat}

                                value={cat}

                            >

                                {cat}

                            </option>

                        ))
                    }

                </select>

            </div>



            <div className="product-count">

                Showing

                <strong>

                    {" "}

                    {filteredProducts.length}

                    {" "}

                </strong>

                Product(s)

            </div>



            <div className="product-grid">                {

                    filteredProducts.length > 0 ? (

                        filteredProducts.map((product) => (

                            <ProductCard

                                key={product._id}

                                product={product}

                            />

                        ))

                    ) : (

                        <div className="no-products">

                            <h2>

                                No Products Found

                            </h2>

                            <p>

                                Try searching with a different keyword.

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

};

export default Shop;