import z from "zod";
import { getDb } from "../config/mongodb";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.email(),
  password: z.string().min(5),
});

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default class User {
  static getCollection() {
    const db = getDb();
    return db.collection("users");
  }

  static async register(payload: IUser): Promise<string> {
    registerSchema.parse(payload);
    const collection = this.getCollection();
    payload.password = bcrypt.hashSync(payload.password, 10);
    await collection.insertOne(payload);
    return "User registered successfully";
  }
}
