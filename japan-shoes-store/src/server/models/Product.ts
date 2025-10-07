import { getDb } from "../config/mongodb";

interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}


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
    const collection = this.getCollection();
    const product = await collection.findOne({ slug });
    return product;
  }
}