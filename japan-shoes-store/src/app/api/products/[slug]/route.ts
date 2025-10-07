export async function GET(request: Request) {
  return Response.json({ message: "This is products detail endpoint" }, { status: 200 });
}