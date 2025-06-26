import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingPanelProp = {
  rate: number;
  count: number;
};

const RatingPanel: React.FC<RatingPanelProp> = ({ rate, count }) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.2 && rate % 1 <= 0.9;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2 text-yellow-500">
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}

      {hasHalfStar && <FaStarHalfAlt key="half" />}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}

      <span className="text-xs md:text-md text-[#404040] ml-1">({rate})</span>
      <span className="text-xs md:text-md text-[#00941b] ml-1">
        {count} {"reviews"}
      </span>
    </div>
  );
};

export default RatingPanel;
