import React from "react";
import "tailwindcss";

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
    <div className="bg-white flex gap-2 flex-col items-center text-black border-2 border-black/10 rounded-2xl shadow-gray-600 shadow-2xl min-h-[310px] max-w-[300px] sm:min-h-[410px] sm:h-[310px] sm:w-[40vw] lg:h-[60vh] lg:w-[20vw] md:min-h-[430px] md:w-[40vw]">
      <div className="self-end mr-2">
        {value.badge && (
          <span className=" left-16 top-1 align-bottom bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10">
            {value.badge}
          </span>
        )}
      </div>
      <div className="w-full h-full ">
        <img
          className="w-[80%] mt-3 mx-auto"
          src={value.imageUrl}
          alt={value.title}
        />
      </div>
      <div className="flex flex-col items-start md:ml-2 text-ellipsis px-4 py-2 w-[100%]">
        <h6 className="font-bold max-w-[200px] truncate text-start">
          {value.title}
        </h6>
        <p className="font-light text-sm sm:text-sm md:text-sm lg:text-[15px] text-gray-500">
          {trimmedDescription(value.description)}
        </p>
        <div className="bg-blue-200 w-30 rounded">${value.price}</div>
        <div className="flex mt-5 gap-2">
          {value.colors.map((color) => (
            <div
              key={color}
              className="w-5 h-5 sm:w-3 sm:h-3 rounded-full border-2 border-gray-500"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
