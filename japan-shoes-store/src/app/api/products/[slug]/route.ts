import Product from "@/server/models/Product";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return Response.json(
        { message: "Product slug is required" },
        { status: 400 }
      );
    }

    const product = await Product.getProductBySlug(slug);

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { product },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}