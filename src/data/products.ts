export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string[];
  rating: {
    rate: number;
    count: number;
  };
  badge?: string;
  colors?: string[];
};

// export interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

// export const Products: Product[] = [
//   {
//     id: 1,
//     imageUrl: "https://files.refurbed.com/ii/iphone-14-pro-1662624575.jpg",
//     title:
//       "iPhoneddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd 14",
//     description: "Apple iPhone 14 with A15 Bionic chip.",
//     price: 79999,
//     colors: ["#954C2E", "#254D70", "#EFE4D2"],
//     badge: "Hot Deal",
//     category: "personalized",
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://tse4.mm.bing.net/th?id=OIP.LkAT-adlPzf1AWJVhles9gHaE8&pid=Api&P=0&h=180",
//     title: "iphone 15 pro",
//     description:
//       "Samsung Galaxy S23 with Snapdragon 8.6 dhasbjkhasfbkjnxvhoihiaf",
//     price: 74999,
//     colors: ["#71C0BB", "#254D70", "#483AA0"],
//     badge: "New",
//     category: "",
//   },
//   {
//     id: 3,
//     imageUrl:
//       "https://tse3.mm.bing.net/th?id=OIP.LmlKtb409aqcFXsF5jWKqAHaHa&pid=Api&P=0&h=180",
//     title: "OnePlus 11",
//     description: "OnePlus 11 with Snapdragon 8.",
//     price: 61999,
//     colors: ["#F79B72", "#254D70", "#7C4585"],
//     category: "gift-hamper",
//   },
//   {
//     id: 4,
//     imageUrl:
//       "https://tse4.mm.bing.net/th?id=OIF.SjTiLFLGFWep3uklJZWnuw&pid=Api&P=0&h=180",
//     title: "Realme 7",
//     description: "Realme 7 with Tensor G2 chip.",
//     price: 9999,
//     colors: ["#954C2E", "#FE7743", "#BE3D2A"],
//     badge: "",
//   },
//   {
//     id: 5,
//     imageUrl: "/p5.jpeg",
//     title: "eco casket",
//     description: "Realme 7 with Tensor G2 chip.",
//     price: 5999,
//     colors: ["#954C2E", "#FE7743", "#BE3D2A"],
//     category: "eco-friendly",
//   },
//   {
//     id: 6,
//     imageUrl:
//       "https://allaboutfunandgames.com/wp-content/uploads/2012/11/Christmas-fun-and-games-gift-basket-for-family.jpg",
//     title: "gift hamper",
//     description: "Realme 7 with Tensor G2 chip.",
//     price: 599,
//     colors: ["#954C2E", "#FE7743", "#BE3D2A"],
//     category: "gift-hamper",
//   },
// ];
