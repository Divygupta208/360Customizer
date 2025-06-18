import React from "react";
import Card from "./UI/Cards/Card";

type Product = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  colors: string[];
  badge?: string;
  onClick?: () => void;
};

type SampleCardProps = {
  products: Product[];
};

const SampleCards: React.FC<SampleCardProps> = ({ products }) => {
  return (
    <div className="grid gap-7 ml-32 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
      {products.map((item, key) => {
        return <Card value={item} key={item.id} />;
      })}
    </div>
  );
};

export default SampleCards;
