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
  _id: ObjectId;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export interface IDetail {
  product: IProduct;
}

export interface IDetailParams {
  params: Promise<{slug: string}>
}

export interface IImageGalleryProps {
  images: string[];
  productName: string;
  productThumbnail: string;
}

export interface IErrorResponse {
  message: string;
  status: number;
}

export interface IButtonProps {
  type: string
  onClick?: () => void
  style?: string
}

export interface AddWishlistProps {
  productId: ObjectId;
  style: string
}

export interface IWishlistProductDetail {
  _id: string;
  name: string;
  slug: string;
  price: number;
  excerpt?: string;
  description?: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WishlistCardProps {
  product: IWishlistProductDetail;
  onRemove: (productId: string) => void;
}

export interface IFeaturedProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  images: string[];
  tags: string[];
}