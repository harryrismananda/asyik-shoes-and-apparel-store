export async function GET(request: Request) {
  return Response.json({ message: "This is products endpoint" }, { status: 200 });
}