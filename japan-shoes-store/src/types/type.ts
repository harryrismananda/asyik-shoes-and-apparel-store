import { ObjectId } from "mongodb";

export interface IWishlist {
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IWishlistDetail {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  productDetail: {
    _id: ObjectId;
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
  };
}


export interface IParams {
  params: Promise<{ id: string }>;
}

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IProduct {
  _id: ObjectId;
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
