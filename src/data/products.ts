export type Product = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  colors: string[];
  badge?: string;
  onClick?: () => void;
};

export const Products: Product[] = [
  {
    id: 1,
    imageUrl: "public/p1.jpeg",
    title:
      "iPhoneddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd 14",
    description: "Apple iPhone 14 with A15 Bionic chip.",
    price: 79999,
    colors: ["#954C2E", "#254D70", "#EFE4D2"],
    badge: "Hot Deal",
  },
  {
    id: 2,
    imageUrl: "/p2.jpeg",
    title: "iphone 15 pro",
    description:
      "Samsung Galaxy S23 with Snapdragon 8.6 dhasbjkhasfbkjnxvhoihiaf",
    price: 74999,
    colors: ["#71C0BB", "#254D70", "#483AA0"],
    badge: "New",
  },
  {
    id: 3,
    imageUrl: "/p3.jpeg",
    title: "OnePlus 11",
    description: "OnePlus 11 with Snapdragon 8.",
    price: 61999,
    colors: ["#F79B72", "#254D70", "#7C4585"],
  },
  {
    id: 4,
    imageUrl: "/p4.jpg",
    title: "Realme 7",
    description: "Realme 7 with Tensor G2 chip.",
    price: 59999,
    colors: ["#954C2E", "#FE7743", "#BE3D2A"],
  },
];
