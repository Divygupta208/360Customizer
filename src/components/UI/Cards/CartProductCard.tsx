import { FaTrash } from "react-icons/fa6";
import type { Product } from "../../../data/products";
import { useProductContext } from "../../../store/ProductContext";

type CartProductProps = {
  product: Product;
};
const CartProductCard: React.FC<CartProductProps> = ({ product }) => {
  const { addToCart, removeFromCart, deleteProduct } = useProductContext();

  return (
    <div className="bg-neutral-100 mt-2 w-full flex rounded-xl">
      <div className="w-[30%] p-4">
        <div className="w-full max-h-[100px] min-h-[30px]">
          <img
            src={
              Array.isArray(product.image) ? product.image[0] : product.image
            }
            className="w-20 h-20 object-contain mix-blend-multiply"
          />
        </div>
      </div>
      <div className="w-[40%] h-full p-4">
        <div className="truncate w-full font-semibold">
          {product.title.split("-")[0]}
        </div>
        <div className="truncate w-full text-[10px] font-semibold text-[#c4a8ab]">
          {product.title.split("-")[1]}
        </div>
        <div className="font-bold ">${product.price}</div>
        <div className="font-semibold text-xs text-blue-500">
          {product.rating.rate}({product.rating.count})
        </div>
      </div>
      <div className="w-[30%] flex flex-col md:flex-row md:gap-4 font-bold justify-center items-center p-3 box-border">
        <button
          className="text-lg cursor-pointer"
          onClick={() => addToCart(product)}
        >
          +
        </button>
        <div className=" text-lg text-green-500">{product.quantity}</div>
        <button
          className="text-lg cursor-pointer"
          onClick={() => removeFromCart(product.id)}
        >
          -
        </button>
      </div>
      <div
        className="text-sm md:texr-lg rounded-xl flex justify-center items-center p-2"
        onClick={() => deleteProduct(product.id)}
      >
        <FaTrash className=" cursor-pointer text-red-400 hover:scale-110" />
      </div>
    </div>
  );
};

export default CartProductCard;
