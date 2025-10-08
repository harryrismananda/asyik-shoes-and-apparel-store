export interface IWishlist {
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  excerpt: string;
  description: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ilogin{
  email: string;
  password: string;
}

export interface IProductCardProps {
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  images: string[];
}
