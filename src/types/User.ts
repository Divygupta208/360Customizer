export type User = {
  name: string;
  email: string;
};

export type Address = {
  id: number;
  country: string;
  fullName: string;
  mobile: string;
  pincode: string;
  localAddress: string;
  street?: string;
  area: string;
  landmark?: string;
  city: string;
  state: string;
};
