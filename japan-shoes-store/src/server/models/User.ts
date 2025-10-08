import { getDb } from "../config/mongodb";
import { signToken } from "../helpers/jwt";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { BaseError, UnauthorizedError } from "../helpers/customError";
import { registerSchema } from "@/validations/validation";
import { IUser } from "@/types/type";





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
    // console.log(existingUsername);
    if(existingUsername) {
      throw new BaseError("Username has been used", 400);
    }
    if(existingUser) {
      throw new BaseError("Email has been used", 400);
    }
    payload.password = hashPassword(payload.password);
    await collection.insertOne(payload);
    return "User registered successfully";
  }

  static async login(email: string, password: string): Promise<string> {
    const collection = this.getCollection();
    const user = await collection.findOne({ email });
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const token = signToken({ id: user._id, username: user.username });
    return token;
  }

}
