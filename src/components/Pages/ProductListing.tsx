import React, { useEffect, useState } from "react";
import Card from "../UI/Cards/Card";
import CustomButton from "../UI/Button/Button";
import type { Product } from "../../data/products";

type ProductListingProps = {
  products: Product[];
};

const Categories = [
  { filter: "all" },
  { filter: "personalized" },
  { filter: "gift-hamper" },
  { filter: "eco-friendly" },
  { filter: "laptops" },
];

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [categoryVal, setCatVal] = useState<string>("");
  const [sortVal, setSortVal] = useState<string>("");
  const [displayProducts, setDisplayProducts] = useState(products);

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
    setCatVal("all");
    setSortVal("");
  };

  const handleSortProducts = (val: string) => {
    const sortedProducts = [...products];

    if (val === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (val === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setDisplayProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 w-full justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-4 sm:w-full w-full">
        <h2 className="text-xl hidden sm:block md:text-2xl font-bold text-center md:text-left">
          Product Listing
        </h2>

        <div className="flex w-full md:w-auto gap-2">
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
      <div className="flex flex-col md:flex-row justify-between place-items-center">
        <div className="category flex flex-row overflow-scroll  w-full sm:flex-row gap-2.5">
          {Categories.map((item) => {
            return (
              <button
                className="px-2 w-full sm:w-30 py-1 rounded-xl text-nowrap bg-slate-300"
                onClick={(e) => {
                  setCatVal(item.filter);
                }}
              >
                {item.filter}
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
            className="bg-black text-white rounded px-4 cursor-pointer"
            onClick={handleClearFilter}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 place-items-center">
        {displayProducts.length !== 0 ? (
          displayProducts.map((item) => {
            return <Card value={item} key={item.id} />;
          })
        ) : (
          <h1 className=" font-bold text-2xl text-center">
            No products found in this category 😕
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
