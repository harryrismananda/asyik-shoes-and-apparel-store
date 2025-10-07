import Product from "@/server/models/Product";

export async function GET(request: Request) {
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
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}