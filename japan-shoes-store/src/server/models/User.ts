import z from "zod";
import { getDb } from "../config/mongodb";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
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
    return db.collection<IUser>("users");
  }

  static async register(payload: IUser): Promise<string> {
    registerSchema.parse(payload);
    const collection = this.getCollection();
    const existingUser = await collection.findOne({email: payload.email});
    const existingUsername = await collection.findOne({username: payload.username});
    if(existingUsername) {
      throw new Error("Username has been used");
    }
    if(existingUser) {
      throw new Error("Email has been used");
    }
    payload.password = bcrypt.hashSync(payload.password, 10);
    await collection.insertOne(payload);
    return "User registered successfully";
  }
}
