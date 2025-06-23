import React, { useEffect, useState } from "react";
import Card from "../UI/Cards/Card";
import CustomButton from "../UI/Button/Button";
import type { Product } from "../../data/products";
import { _get } from "../../api/ProductServices/services";
import { ClipLoader } from "react-spinners";
import GenericCard from "../UI/Cards/ResuableCard";

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>();
  const [searchVal, setSearchVal] = useState<string>("");
  const [categoryVal, setCatVal] = useState<string>("");
  const [sortVal, setSortVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(products);
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      //   throw "error";
      const response = await _get("/products");
      const data: Product[] = await response.data;
      setProducts(data);
      setDisplayProducts(data);
      setFailure(false);
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFailure(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
      const uniqueCategories = Array.from(
        new Set(products.map((item) => item.category))
      );
      setCategories(uniqueCategories);

      console.log("Categories:", uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem("category", categoryVal);
    const getCategory = localStorage.getItem("category");
    if (getCategory) {
      handleSearchProducts();
    }
    console.log("running");
  }, [categoryVal, localStorage.getItem("category")]);

  const handleSearchProducts = () => {
    const categorizedProducts =
      localStorage.getItem("category") !== "all"
        ? products.filter((item) => {
            return item.category === localStorage.getItem("category");
          })
        : products;

    const filteredProducts = categorizedProducts.filter((item) => {
      return item.title.toLowerCase().match(`${searchVal?.toLowerCase()}`);
    });

    setDisplayProducts(filteredProducts);
  };

  const handleClearFilter = () => {
    localStorage.removeItem("category");
    setSearchVal("");
    setCatVal("all");
    setSortVal("");
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

  return (
    <div className="flex flex-col gap-6 px-4 py-6 w-full justify-center">
      <div className="flex flex-col w-full   md:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-4 sm:w-full shadow-2xl shadow-grayy-400 min-w-[323px]">
        <h2 className="text-xl hidden sm:block md:text-2xl font-bold text-center md:text-left">
          Product Listing
        </h2>

        <div className="flex w-[100%] md:w-auto gap-2">
          <input
            type={`text`}
            placeholder="Search..."
            onChange={(e) => setSearchVal(e.target.value)}
            className={`flex-1 border border-gray-300 px-4 py-2 rounded-md w-96 md:w-72 `}
          />
          <CustomButton
            label="Search"
            className="bg-black text-white px-4 py-2 rounded-md"
            onClick={handleSearchProducts}
          />
        </div>
      </div>
      <div className="font-bold text-center md:text-start">Filter</div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="category flex flex-row overflow-scroll  w-full sm:flex-row gap-2.5 min-w-[350px]">
          {categories?.map((item) => {
            return (
              <button
                key={item}
                className="px-2  font-semibold w-full sm:w-fit py-1 rounded-xl text-nowrap bg-slate-300"
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
              <option value={""} disabled hidden>
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

      {!isLoading && !failure && (
        <div className="grid gap-6 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 place-items-center">
          {displayProducts.length !== 0 ? (
            displayProducts.map((item) => {
              return <GenericCard data={item} type="product" key={item.id} />;
            })
          ) : (
            <h1 className=" font-bold text-2xl text-center">
              No products found in this category 😕
            </h1>
          )}
        </div>
      )}
      {isLoading && (
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
      {failure && (
        <div className="text-center mt-48">
          <div className="text-center  text-4xl">OOPS! Try Again 🥲</div>
          <button
            onClick={() => {
              setFailure(false);
              fetchData();
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
