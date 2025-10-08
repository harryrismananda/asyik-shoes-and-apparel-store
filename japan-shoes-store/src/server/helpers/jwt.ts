import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d" });
}

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET as string);
}