import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../UI/Button/Button";
import { _get } from "../../../api/ProductServices/services";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router";
import ReusableCard from "../../UI/Cards/ResuableCard";
import { FaCartShopping } from "react-icons/fa6";
import { useProductContext } from "../../../store/ProductContext";
import type { Product } from "../../../data/products";
import { AuthContext } from "../../../store/AuthContext";

const ProductListing = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Auth context not found</div>;
  }

  const { isLoggedIn } = auth;

  const navigate = useNavigate();
  const {
    allProducts: products,
    cartProducts,
    addToCart,
    fetchAllProducts,
    isLoading,
    error,
  } = useProductContext();

  const [categories, setCategories] = useState<string[]>();
  const [searchVal, setSearchVal] = useState<string>("");
  const [categoryVal, setCatVal] = useState<string>("");
  const [sortVal, setSortVal] = useState<string>("");
  const [displayProducts, setDisplayProducts] = useState(products);

  useEffect(() => {
    fetchAllProducts();
    const storedCategory = localStorage.getItem("category") || "";
    setCatVal(storedCategory);
    setSearchVal("");
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(
        new Set(products.map((item) => item.category))
      );
      setCategories(uniqueCategories);
      handleSearchProducts();
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("category", categoryVal || "all");
      handleSearchProducts();
    }
  }, [categoryVal]);

  useEffect(() => {
    const getCategory = localStorage.getItem("category");
    if (getCategory) {
      handleSearchProducts();
    }
    console.log("running");
  }, [categoryVal, localStorage.getItem("category")]);

  const handleSearchProducts = () => {
    const category = localStorage.getItem("category") || "all";

    const categorizedProducts =
      category !== "all"
        ? products.filter((item) => item.category === category)
        : products;

    const filteredProducts = categorizedProducts.filter((item) =>
      item.title.toLowerCase().includes(searchVal.toLowerCase())
    );

    setDisplayProducts(filteredProducts);
  };
  const handleClearFilter = () => {
    localStorage.removeItem("category");
    setCatVal("all");
    setSearchVal("");
    setSortVal("");
    setDisplayProducts(products); // ✅ Reset to all products
  };

  const handleSortProducts = (val: string) => {
    const sortedProducts = [...displayProducts];

    if (val === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (val === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setDisplayProducts(sortedProducts);
  };

  const handleDisplayProductDetails = (productId: any) => {
    navigate(`${productId}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const addProductToCart = (productData: Product) => {
    addToCart(productData);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 w-full justify-center">
      <div className="w-full rounded-xl shadow-2xl shadow-gray-400 p-4 min-w-[270px]">
        <div className="flex flex-row md:flex-row items-center justify-between gap-4 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-center md:text-left w-full md:w-auto hidden sm:block">
            Product Listing
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchVal(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-72"
            />
            <CustomButton
              label="Search"
              className="bg-black hidden sm:block text-white px-4 py-2 rounded-md w-full sm:w-auto"
              onClick={handleSearchProducts}
            />
          </div>

          <div className="flex gap-2 items-center justify-center w-full md:w-auto">
            <button
              className="relative rounded-xl p-2 bg-white hover:bg-gray-100 transition duration-200 hover:scale-110"
              onClick={() => handleCartClick()}
            >
              <FaCartShopping className="w-6 h-6 text-blue-500" />

              {cartProducts.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {cartProducts.length}
                </span>
              )}
            </button>
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              className="text-blue-500"
            >
              {isLoggedIn ? "Profile" : "Login"}
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center md:text-start text-sm text-gray-500">
        Filter
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="category flex flex-row w-full sm:flex-row gap-2.5 min-w-[350px] overflow-scroll">
          {categories?.map((item) => {
            return (
              <button
                key={item}
                className="px-2 w-full text-xs sm:w-fit py-1 rounded-xl text-nowrap bg-black text-white"
                onClick={() => {
                  setCatVal(item);
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="filter">
            <select
              name="Sort"
              id="Sort"
              value={sortVal}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const value = e.target.value;
                setSortVal(value);
                handleSortProducts(value);
              }}
            >
              <option value={""} disabled hidden className="">
                Sort By
              </option>
              <option value={"relevance"}>Relevance</option>
              <option value={"low"}>Price ⇓</option>
              <option value={"high"}>Price ⇑</option>
              <option></option>
            </select>
          </div>
          <button
            className="bg-black text-white rounded px-4 cursor-pointer text-nowrap"
            onClick={handleClearFilter}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {!isLoading && !error && (
        <div className="grid gap-6 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 place-items-center">
          {displayProducts.length !== 0 ? (
            displayProducts.map((item) => {
              return (
                <ReusableCard
                  data={item}
                  type="product"
                  key={item.id}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleDisplayProductDetails(item.id);
                  }}
                  addProductToCart={() => addProductToCart(item)}
                />
              );
            })
          ) : (
            <h1 className=" font-bold text-2xl text-center">
              No products found in this category 😕
            </h1>
          )}
        </div>
      )}
      {isLoading && products.length === 0 && (
        <div className="w-full h-full flex justify-center align-middle mt-42">
          <ClipLoader
            size={100}
            color={"#000"}
            loading={isLoading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {error && (
        <div className="text-center mt-48">
          <div className="text-center  text-4xl">OOPS! Try Again 🥲</div>
          <button
            onClick={() => {
              fetchAllProducts();
            }}
            className="bg-red-500 font-bold text-white rounded-lg mt-4 w-20 h-15"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
