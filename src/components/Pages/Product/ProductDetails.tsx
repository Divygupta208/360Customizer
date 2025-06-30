import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddToCartBar from "../../UI/Bars/AddToCartBar";
import ProductBanner from "../../UI/Banners/ProductBanner";
import ProductInfo from "./ProductInfo";
import { ClipLoader } from "react-spinners";
import { PiImageBrokenLight } from "react-icons/pi";
import { fetchProductInfo } from "../../../api/ProductServices/services";
import type { Product } from "../../../types/Product";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [display, setDisplayImage] = useState("");

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    setTimeout(() => {}, 2000);
    try {
      // throw "Error";
      const product = await fetchProductInfo(productId);
      setProductInfo(product);
      console.log(product);
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && !hasError && (
        <div className="flex flex-col w-[100vw] h-screen min-h-[600px] md:flex-row  min-w-[300px]">
          <section className="text-white bg-[#ffffff] md:w-[50%] h-[50%] md:h-[100%] flex flex-col md:flex-row p-2  place-items-center justify-center min-h-[300px] gap-1">
            <div className="bg-[#f2f6f0] w-[100%] md:w-[80%] h-[80%] md:h-full">
              <img
                src={Array.isArray(display) ? display[0] : productInfo?.image}
                className="object-contain w-full h-full p-6 mix-blend-multiply"
              />
            </div>
            <div className="flex flex-row md:flex-col w-full  md:w-[20%] h-[30%] md:h-full bg-[#ffffff]  justify-center items-center">
              {(Array.isArray(productInfo?.image)
                ? productInfo.image
                : [productInfo?.image]
              ).map((image, index) => {
                return (
                  <div
                    key={index}
                    className="w-20 h-20 lg:w-30 lg:h-30 mb-2 mx-2"
                  >
                    <img
                      src={image}
                      onClick={() => setDisplayImage(image ?? "")}
                      className="w-full h-full object-cover object-center mix-blend-multiply rounded-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <section className="md:w-[50%] md:flex  md:flex-col md:justify-center box-border p-2">
            <ProductInfo productInfo={productInfo} />
            <div className="footer">
              <h3 className="font-semibold p-1 text-sm md:text-sm tracking-wider uppercase">
                size :
              </h3>
              <div className="flex gap-2 p-1 text-sm font-semibold">
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
              <div className="font-semibold p-1 text-sm md:text-sm tracking-wider uppercase">
                Order Details :
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
              fetchProductDetails();
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
