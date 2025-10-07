//post
export async function POST(request: Request) {
  return Response.json({ message: "This is login endpoint" }, { status: 200 });
}