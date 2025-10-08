import { errorHandler } from "@/server/helpers/errorHandler";
import Product from "@/server/models/Product";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await Product.getProductBySlug(slug);
    return Response.json(
      { product },
      { status: 200 }
    );
  } catch (error: unknown) {
    const { message, status } = errorHandler(error);
    return Response.json({ message }, { status });
  }
}