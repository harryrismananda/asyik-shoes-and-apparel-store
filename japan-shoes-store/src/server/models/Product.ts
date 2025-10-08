import { IProduct } from "@/types/type";
import { getDb } from "../config/mongodb";
import { BaseError, NotFoundError } from "../helpers/customError";




export default class Product {
  static getCollection() {
    const db = getDb();
    return db.collection<IProduct>("products");
  }

  static async getAllProducts (page:number = 1, limit: number = 16): Promise<IProduct[]> {
    const filter = {};
    const skip = (page - 1) * limit;
    const collection = this.getCollection();
    const products = await collection.find(filter).sort({createdAt: -1}).skip(skip).limit(limit+1).toArray();
    return products;
  }
  static async getTotalProducts (): Promise<number> {
    const collection = this.getCollection();
    const total = await collection.countDocuments();
    return total;
  }

  static async getProductBySlug(slug: string): Promise<IProduct | null> {
    if(!slug) {
      throw new BaseError("Slug is required", 400);
    }
    const collection = this.getCollection();
    const product = await collection.findOne({ slug });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
}