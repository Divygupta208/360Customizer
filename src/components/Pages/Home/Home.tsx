import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProductContext } from "../../../store/ProductContext";
import ReusableCard from "../../UI/Cards/ResuableCard";
import CustomButton from "../../UI/Button/Button";

const Home = () => {
  const { allProducts, fetchAllProducts } = useProductContext();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const featuredProducts = allProducts.slice(0, 4);
  const categories = [...new Set(allProducts.map((p) => p.category))].slice(
    0,
    4
  );

  return (
    <div className="w-full overflow-hidden">
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-[0.8]"
        >
          <source src="Clothing Brand Promotional Video.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20 text-white text-center md:text-left">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              Discover Quality, Shop Effortlessly
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              everything you need in one place.
            </p>
            <Link to="/home/products">
              <button className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map((category) => (
            <Link
              to="/home/products"
              onClick={() => localStorage.setItem("category", category)}
              key={category}
              className="bg-white shadow hover:shadow-md border px-5 py-3 rounded-full transition-all duration-300 text-sm hover:bg-blue-100 cursor-pointer"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className=" md:px-20 py-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Featured Products
        </h2>
        <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center">
          {featuredProducts.map((product) => (
            <ReusableCard
              data={product}
              key={product.id}
              type="product"
              addProductToCart={() => {}}
              onClick={() => {}}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/home/products">
            <CustomButton
              label="View All Products"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
