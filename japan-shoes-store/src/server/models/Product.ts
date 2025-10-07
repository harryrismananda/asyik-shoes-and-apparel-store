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

  static async getAllProducts (): Promise<IProduct[]> {
    const collection = this.getCollection();
    const products = await collection.find().toArray();
    return products;
  }

}