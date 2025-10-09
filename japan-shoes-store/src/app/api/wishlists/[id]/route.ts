import { errorHandler } from "@/server/helpers/errorHandler";
import Wishlist from "@/server/models/Wishlist";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { IParams } from "@/types/type";
//delete



export async function DELETE(req:NextRequest, params:IParams) {
  try {
  // console.log(req.headers.get("x-user-id"), "<<< ini userId yang masuk ke route");
  const userId = new ObjectId(req.headers.get("x-user-id") as string)
  // console.log(userId, "<<< ini userId yang masuk ke route");
  const { id } = await params.params
  const productId = new ObjectId(id)
  // console.log(productId, "<<< ini productId yang masuk ke route");
  const message = await Wishlist.removeFromWishlist(userId, productId)
  return Response.json({ message }, { status: 200 });
 } catch (error:unknown) {
  const {message, status} = errorHandler(error);
  return Response.json({ message }, { status });
 }
}