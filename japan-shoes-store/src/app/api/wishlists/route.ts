import { NextRequest } from "next/server";

//get 
export async function GET(req:NextRequest) {
  return Response.json({ message: "This is wishlists endpoint" }, { status: 200 });
}

//post
export async function POST(req:NextRequest) {
  return Response.json({ message: "This is wishlists endpoint" }, { status: 200 });
}

//delete
export async function DELETE(req:NextRequest) {
  return Response.json({ message: "This is wishlists endpoint" }, { status: 200 });
}