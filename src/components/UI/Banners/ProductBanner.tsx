import { GrTest } from "react-icons/gr";
import { LuHeartHandshake } from "react-icons/lu";
import { MdVerifiedUser } from "react-icons/md";

const ProductBanner = () => {
  return (
    <div className="Banner py-7 bg-[#f2f6f0] flex justify-center items-center gap-3 lg:gap-7 font-semibold w-full md:w-[90%] md:ml-[5%] mt-[5%] rounded">
      <div className="flex flex-col justify-center items-center">
        <MdVerifiedUser />
        <h6>Trustable</h6>
      </div>
      <div className="flex flex-col justify-center items-center">
        <LuHeartHandshake />
        <h6>Creulty Free</h6>
      </div>
      <div className="flex flex-col justify-center items-center">
        <GrTest />
        <h6>Safe to use</h6>
      </div>
    </div>
  );
};

export default ProductBanner;
