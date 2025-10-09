import { getDb } from "../config/mongodb";
import { IWishlist, IWishlistDetail } from "@/types/type";
import { BaseError } from "../helpers/customError";
import { ObjectId } from "mongodb";

export default class Wishlist {
  static getCollection() {
    const db = getDb();
    return db.collection<IWishlist>("wishlists");
  }

  static async addToWishlist(payload: IWishlist): Promise<string> {
    // wishlistSchema.parse(payload);
    const collection = this.getCollection();
    const existingWishlist = await collection.findOne({
      userId: payload.userId,
      productId: payload.productId,
    });
    if (existingWishlist) {
      throw new BaseError("Product already in wishlist", 400);
    }
    payload.createdAt = new Date();
    payload.updatedAt = new Date();
    await collection.insertOne(payload);
    return "Product added to wishlist";
  }

  static async removeFromWishlist(
    userId: ObjectId,
    productId: ObjectId
  ): Promise<string> {
    const collection = this.getCollection();
    // console.log(productId, "<<< ini yang masuk ke server");
    // console.log(userId, "<<< ini yang masuk ke server");
    const existingWishlist = await collection.findOne({ userId, productId });
    console.log(existingWishlist);
    if (!existingWishlist) {
      throw new BaseError("Product not in wishlist", 400);
    }
    await collection.deleteOne({ userId, productId });
    return "Product removed from wishlist";
  }

  static async getUserWishlist(userId: ObjectId): Promise<IWishlistDetail[]> {
    const collection = this.getCollection();
    const wishlists = await collection
      .aggregate<IWishlistDetail>(
        [
          {
            $match: {
              userId: new ObjectId(userId),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productDetail",
            },
          },
          { $unwind: { path: "$productDetail" } },
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      )
      .toArray();
    return wishlists;
  }
}
