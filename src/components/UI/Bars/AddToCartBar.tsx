import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { BsFillInfoCircleFill } from "react-icons/bs";

const AddToCartBar = () => {
  const [quantity, setQuantity] = useState(0);
  const [disclaimer, setDisclaimer] = useState("Ships Free For The Week");

  return (
    <>
      <div className="flex gap-2 mt-2 p-1">
        <div className="flex gap-2 border-2 rounded-full px-5 py-2">
          <button onClick={() => setQuantity((prev) => prev - 1)}>
            <FaMinus />
          </button>
          <div className="text-lg font-bold">{quantity}</div>
          <button onClick={() => setQuantity((prev) => prev + 1)}>
            <FaPlus />
          </button>
        </div>
        <button className=" rounded bg-[#3d3546] text-white px-8 py-2 text-nowrap">
          ADD TO CART
        </button>
        <div className=" flex place-items-center justify-center text-2xl">
          <CiHeart />
        </div>
      </div>
      <div className="flex items-center gap-2 p-1 place-content-center text-sm text-neutral-500">
        {disclaimer}
        <BsFillInfoCircleFill className="text-blue-700 text-lg" />
      </div>
      <div className=" p-2 flex gap-2 place-content-center">
        <input
          placeholder="Enter Pin-Code..."
          className="border-2 rounded-xl px-2"
        />
        <button className="bg-[#d7d7d7] text-[#2e1937] text-sm px-2 rounded-xl">
          Change
        </button>
      </div>
    </>
  );
};

export default AddToCartBar;
