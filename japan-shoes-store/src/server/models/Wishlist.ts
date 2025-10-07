import z from "zod";
import { getDb } from "../config/mongodb";

const wishlistSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  productId: z.string().min(1, "Product ID is required"),
});

interface IWishlist {
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class Wishlist {
  static getCollection() {
    const db = getDb();
    return db.collection<IWishlist>("wishlists");
  } 

  static async addToWishlist(payload: IWishlist): Promise<string> {
    wishlistSchema.parse(payload);
    const collection = this.getCollection();
    const existingWishlist = await collection.findOne({userId: payload.userId, productId: payload.productId});
    if(existingWishlist) {
      throw new Error("Product already in wishlist");
    }
    payload.createdAt = new Date();
    payload.updatedAt = new Date();
    await collection.insertOne(payload);
    return "Product added to wishlist";
  }
  
  static async removeFromWishlist(userId: string, productId: string): Promise<string> {
    const collection = this.getCollection();
    const existingWishlist = await collection.findOne({userId, productId});
    if(!existingWishlist) {
      throw new Error("Product not in wishlist");
    }
    await collection.deleteOne({userId, productId});
    return "Product removed from wishlist";
  }

  static async getUserWishlist(userId: string): Promise<IWishlist[]> {
    const collection = this.getCollection();
    const wishlists = await collection.find({userId}).toArray();
    return wishlists;
  }
}