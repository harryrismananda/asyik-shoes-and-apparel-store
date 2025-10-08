import { errorHandler } from "@/server/helpers/errorHandler";
import Wishlist from "@/server/models/Wishlist";
import { IWishlist } from "@/types/type";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

//get 
export async function GET(req:NextRequest) {
 try {
  const userId = new ObjectId(req.headers.get("x-user-id") as string)
  const wishlists = await Wishlist.getUserWishlist(userId)

   return Response.json({ wishlists }, { status: 200 });
 } catch (error:unknown) {
  const {message, status} = errorHandler(error);
  return Response.json({ message }, { status });
 }
}

//post
export async function POST(req:NextRequest) {
  try {
  const userId = new ObjectId(req.headers.get("x-user-id") as string)
  const body:{productId: string} = await req.json()
  const productId = new ObjectId(body.productId)
  const payload:IWishlist = { userId, productId }
  const message = await Wishlist.addToWishlist(payload)
  return Response.json({ message }, { status: 200 });
 } catch (error:unknown) {
  const {message, status} = errorHandler(error);
  return Response.json({ message }, { status });
 }
}
