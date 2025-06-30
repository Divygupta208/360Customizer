import React, { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import ReusableCard from "../../UI/Cards/ResuableCard";
import { useProductContext } from "../../../store/ProductContext";
import { AuthContext } from "../../../store/AuthContext";
import type { Product } from "../../../types/Product";

const ProductListing = () => {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Auth context not found</div>;

  const navigate = useNavigate();
  const {
    allProducts: products,
    addToCart,
    fetchAllProducts,
    search: searchVal,
    setSearch: setSearchVal,
    isLoading,
    error,
  } = useProductContext();

  const [categories, setCategories] = useState<string[]>();
  const [categoryVal, setCatVal] = useState<string>("");
  const [sortVal, setSortVal] = useState<string>("");
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts();
    const storedCategory = localStorage.getItem("category") || "all";
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
    localStorage.setItem("category", categoryVal || "all");
    handleSearchProducts();
  }, [categoryVal]);

  useEffect(() => {
    handleSearchProducts();
  }, [searchVal]);

  const handleSearchProducts = () => {
    const category = localStorage.getItem("category") || "all";

    const categorizedProducts =
      category !== "all"
        ? products.filter((item) => item.category === category)
        : products;

    const filteredProducts = categorizedProducts.filter((item) =>
      item.title.toLowerCase().includes(searchVal || "".toLowerCase())
    );

    setDisplayProducts(filteredProducts);
  };

  const handleClearFilter = () => {
    localStorage.removeItem("category");
    setCatVal("all");
    setSearchVal("");
    setSortVal("");
    setDisplayProducts(products);
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

  const handleDisplayProductDetails = (productId: number) => {
    navigate(`${productId}`);
  };

  const addProductToCart = (productData: Product) => {
    addToCart(productData);
  };

  return (
    <div className="flex flex-col gap-6 py-6 w-full justify-center">
      <div className="text-center md:text-start text-sm text-gray-500 md:ml-5">
        Filter
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="category flex flex-row md:ml-5 w-full sm:flex-row gap-2.5 min-w-[300px] overflow-scroll">
          {categories?.map((item) => (
            <button
              key={item}
              className="px-2 w-full text-xs sm:w-fit py-1 rounded-xl text-nowrap bg-black text-white"
              onClick={() => setCatVal(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:mr-5 items-center">
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
              <option value={""} disabled hidden>
                Sort By
              </option>
              <option value={"relevance"}>Relevance</option>
              <option value={"low"}>Price ⇓</option>
              <option value={"high"}>Price ⇑</option>
            </select>
          </div>
          <button
            className="bg-black text-white rounded px-4 cursor-pointer text-nowrap md:w-32 w-32"
            onClick={handleClearFilter}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {!isLoading && !error && (
        <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 place-items-center">
          {displayProducts.length > 0 ? (
            displayProducts.map((item) => (
              <ReusableCard
                data={item}
                type="product"
                key={item.id}
                onClick={() => {
                  handleDisplayProductDetails(item.id);
                }}
                addProductToCart={() => addProductToCart(item)}
              />
            ))
          ) : (
            <h1 className="font-bold text-2xl text-center">
              No products found in this category 😕
            </h1>
          )}
        </div>
      )}

      {isLoading && products.length === 0 && (
        <div className="w-full h-full flex justify-center mt-42">
          <ClipLoader size={100} color={"#000"} loading={isLoading} />
        </div>
      )}

      {error && (
        <div className="text-center mt-48">
          <div className="text-4xl">OOPS! Try Again 🥲</div>
          <button
            onClick={fetchAllProducts}
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
