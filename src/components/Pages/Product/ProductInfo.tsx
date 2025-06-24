import React from "react";
import RatingPanel from "../../UI/Ratingpanel/RatingPanel";
import type { ProductCardData } from "../../../types/Card";

type ProductInfoProp = {
  productInfo?: ProductCardData;
};

const ProductInfo: React.FC<ProductInfoProp> = ({ productInfo }: any) => {
  return (
    <>
      <div className="w-[100%]">
        <h3 className="font-semibold font-sans md:text-xl text-[#757575] tracking-wider p-1 box-border">
          {productInfo?.title.split("-")[0]}
        </h3>
        <h1 className="font-semibold md:text-2xl p-1 tracking-wide w-full ">
          {productInfo?.title.split("-")[1]}
        </h1>
      </div>
      <div className="p-1 md:text-xl">
        <RatingPanel
          rate={productInfo?.rating.rate ?? 0}
          count={productInfo?.rating.count ?? 0}
        />
        <div className="font-semibold p-1 md:text-2xl">
          ${productInfo?.price}
        </div>
      </div>

      <div className="text-sm md:text-md text-[#a4a59e] text-justify break-all  p-1 overflow-hidden">
        {productInfo?.description}
      </div>
    </>
  );
};

export default ProductInfo;
