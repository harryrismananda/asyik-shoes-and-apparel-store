import { errorHandler } from "@/server/helpers/errorHandler";
import Product from "@/server/models/Product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 16;

    const products = await Product.getAllProducts(page, limit);
    const total = await Product.getTotalProducts();
    // console.log(products);

    const hasMore = products.length > limit;
    const result = hasMore ? products.slice(0, limit) : products;

    return Response.json(
      {
        products: result,
        hasMore,
        currentPage: page,
        total,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const {message, status} = errorHandler(error);
    return Response.json({ message }, { status });
  }
}