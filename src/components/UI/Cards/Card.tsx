import React from "react";
import CustomButton from "../Button/Button";
import type { Product } from "../../../data/products";

type CardProps = {
  value: Product;
};

const Card: React.FC<CardProps> = ({ value }) => {
  const trimmedDescription = (val: string): string => {
    return val.length > 40 ? `${val.slice(0, 40)}...` : val;
  };

  return (
    <div className="relative bg-white flex flex-col justify-between text-black border-2 border-black/10 rounded-2xl shadow-lg min-h-[380px] max-w-[300px] min-w-[300px] p-4 sm:w-[40vw] lg:w-[20vw] transition-transform hover:scale-[1.03] duration-300">
      {value.badge && (
        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md z-10">
          {value.badge}
        </div>
      )}

      <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
        <img
          className="object-contain w-full h-full"
          src={value.imageUrl}
          alt={value.title}
        />
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <h6 className="font-bold text-base truncate max-w-full">
          {value.title}
        </h6>
        <p className="text-sm text-gray-600 truncate">
          {trimmedDescription(value.description)}
        </p>
        <div className="bg-blue-100 text-blue-700 w-fit px-2 py-1 rounded text-sm font-medium">
          ${value.price}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            {value.colors.map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-400"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <CustomButton label="Buy Now" className="bg-black text-white p-2" />
        </div>
      </div>
    </div>
  );
};

export default Card;
