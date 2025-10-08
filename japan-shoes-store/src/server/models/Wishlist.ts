import { getDb } from "../config/mongodb";
import { IWishlist } from "@/types/type";
import { wishlistSchema } from "@/validations/validation";
import { BaseError } from "../helpers/customError";
import { ObjectId } from "mongodb";


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
      throw new BaseError("Product already in wishlist", 400);
    }
    payload.createdAt = new Date();
    payload.updatedAt = new Date();
    await collection.insertOne(payload);
    return "Product added to wishlist";
  }
  
  static async removeFromWishlist(userId: ObjectId, productId: ObjectId): Promise<string> {
    const collection = this.getCollection();
    const existingWishlist = await collection.findOne({userId, productId});
    if(!existingWishlist) {
      throw new BaseError("Product not in wishlist", 400);
    }
    await collection.deleteOne({userId, productId});
    return "Product removed from wishlist";
  }

  static async getUserWishlist(userId: ObjectId): Promise<IWishlist[]> {
    const collection = this.getCollection();
    const wishlists = await collection.find({userId}).toArray();
    return wishlists;
  }
}