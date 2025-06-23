export type ProductCardData = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  badge?: string;
  colors?: string[];
  rating?: { rate: number; count: number };
};

export type ProfileCardData = {
  name: string;
  profilePicture: string;
  role: string;
  organisation: string;
  bio: string;
  socialLinks: {
    social: string;
    logo: React.ReactNode;
    link: string;
  }[];
};
