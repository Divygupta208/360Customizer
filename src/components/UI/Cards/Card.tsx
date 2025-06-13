import React from "react";
import "tailwindcss";

type valueObject = {
  image: string;
  title: string;
  description: string;
  price: number;
  colors: string[];
};

type CardProps = {
  value: valueObject;
};

const Card: React.FC<CardProps> = ({ value }) => {
  return (
    <div className="bg-white flex gap-3 flex-col items-center text-black border-2 border-black/10 rounded-2xl shadow-gray-600 shadow-2xl h-[60vh] sm:h-[60vh] sm:w-[40vw] lg:h-[60vh] lg:w-[20vw] md:w-[40vw]">
      <img className="w-[30vh] mt-3" src={value.image} />
      <div className="flex flex-col items-start md:ml-5">
        <h6 className="font-bold p-2">{value.title}</h6>
        <p className="font-light text-sm sm:text-sm md:text-sm lg:text-[15px] text-gray-500">
          {value.description}
        </p>
        <div className="bg-blue-200 w-30 rounded">${value.price}</div>
        <div className="flex mt-5 gap-2">
          {value.colors.map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border-2 border-gray-500"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
