import { useState } from "react";
import { useParams } from "react-router";
import { fetchProductInfo } from "../../../api/ProductServices/services";
import type { Product } from "../../../data/products";
// import { FaRegCircle } from "react-icons/fa";
import AddToCartBar from "../../UI/Bars/AddToCartBar";
import ProductBanner from "../../UI/Banners/ProductBanner";
import ProductInfo from "./ProductInfo";
import { ClipLoader } from "react-spinners";
import { PiImageBrokenLight } from "react-icons/pi";

const dummyData = {
  id: 2,
  title: "Mens Casual Premium Slim Fit T-Shirts ",
  price: 22.3,
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  category: "men's clothing",
  image: [
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "https://images.pexels.com/photos/32638318/pexels-photo-32638318.jpeg",
    "https://images.pexels.com/photos/2229712/pexels-photo-2229712.jpeg",
  ],
  rating: { rate: 4.1, count: 259 },
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<Product>(dummyData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [display, setDisplayImage] = useState("");

  // useEffect(() => {
  //   fetchProductDetails();
  // }, []);

  // const fetchProductDetails = async () => {
  //   setIsLoading(true);
  //   setTimeout(() => {}, 2000);
  //   try {
  //     // throw "Error";
  //     const product = await fetchProductInfo(productId);
  //     setProductInfo(product);
  //   } catch (error) {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     setHasError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {/* <div className="text-center uppercase font-bold">Product-Details</div> */}
      {!isLoading && !hasError && (
        <div className="flex flex-col w-[100vw] h-screen min-h-[600px] md:flex-row  min-w-[300px]">
          <section className="text-white bg-[#f2f6f0] md:w-[50%] h-[50%] md:h-[100%] flex flex-col md:flex-row p-2  place-items-center justify-center min-h-[300px] gap-1">
            <div className="bg-[#f2f6f0] w-[100%] md:w-[80%] h-[80%] md:h-full">
              <img
                src={display || productInfo.image[0]}
                className="object-contain w-full h-full p-6 mix-blend-multiply "
              />
            </div>
            <div className="flex flex-row md:flex-col w-full  md:w-[20%] h-[30%] md:h-full bg-[#f2f6f0]  justify-center items-center">
              {productInfo?.image.map((image: any) => {
                return (
                  <div className="w-20 h-20 lg::w-30 lg:h-30 mb-2">
                    <img
                      src={image}
                      onClick={(e) => setDisplayImage(image)}
                      className="w-[100%] h-[100%] object-contain mix-blend-multiply"
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <section className="md:w-[50%] md:flex  md:flex-col md:justify-center">
            <ProductInfo productInfo={productInfo} />
            <div className="footer">
              <h3 className="font-semibold p-1 md:text-md">size :</h3>
              <div className="flex gap-2 p-1 text-sm place-content-center font-semibold">
                <div className="bg-[#d6e2e4] p-1 w-10 rounded-sm text-center">
                  sm
                </div>
                <div className="bg-[#d6e2e4] p-1 w-10 rounded-sm text-center">
                  md
                </div>
                <div className="bg-[#d6e2e4] p-1 w-10 rounded-sm text-center">
                  lg
                </div>
              </div>
              <AddToCartBar />
            </div>
            <ProductBanner />
          </section>
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
      {hasError && (
        <div className="text-center mt-48">
          <div className="text-center  text-4xl flex justify-center items-center">
            OOPS! Try Again <PiImageBrokenLight />
          </div>
          <button
            onClick={() => {
              setHasError(false);
              // fetchProductDetails();
            }}
            className="bg-red-500 font-bold text-white rounded-lg mt-4 w-20 h-15"
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
