import React from "react";
import Card from "./UI/Cards/Card";

type Product = {
  image: string;
  title: string;
  description: string;
  price: number;
  colors: string[];
};

type SampleCardProps = {
  products: Product[];
};

const SampleCards: React.FC<SampleCardProps> = ({ products }) => {
  return (
    <div className="grid gap-7 lg:gap-20 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
      {products.map((item) => {
        return <Card value={item} />;
      })}
    </div>
  );
};

export default SampleCards;
