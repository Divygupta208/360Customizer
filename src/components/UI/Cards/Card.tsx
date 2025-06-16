import React from "react";
import CustomButton from "../Button/button";

type valueObject = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  colors: string[];
  badge?: string;
  onClick?: () => void;
};

type CardProps = {
  value: valueObject;
};

const Card: React.FC<CardProps> = ({ value }) => {
  const trimmedDescription = (val: string): string => {
    return val.length > 20 ? `${val.slice(0, 20)}...` : val;
  };

  return (
    <div className="bg-white flex flex-col justify-between text-black border-2 border-black/10 rounded-2xl shadow-gray-600 shadow-2xl min-h-[320px] max-w-[300px] sm:min-h-[410px] sm:w-[40vw] md:w-[40vw] lg:w-[20vw] relative p-4">
      {value.badge && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10">
          {value.badge}
        </span>
      )}

      <div className="flex justify-center">
        <img
          className="w-[70%] mt-2 object-contain"
          src={value.imageUrl}
          alt={value.title}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h6 className="font-bold max-w-full truncate">{value.title}</h6>

        <p className="font-light text-sm text-gray-500">
          {trimmedDescription(value.description)}
        </p>

        <div className="bg-blue-200 px-2 py-1 rounded w-fit">
          ${value.price}
        </div>

        <div className="flex gap-2 mt-2">
          {value.colors.map((color) => (
            <div
              key={color}
              className="w-3 h-4 rounded-full border-2 border-gray-500"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>

        <div className="mt-4">
          <CustomButton label="Buy Now" onClick={value.onClick || (() => {})} />
        </div>
      </div>
    </div>
  );
};

export default Card;
