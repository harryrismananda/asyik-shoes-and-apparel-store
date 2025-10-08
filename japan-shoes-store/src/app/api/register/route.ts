import { NextRequest } from "next/server";
import User from "../../../server/models/User";
import { errorHandler } from "@/server/helpers/errorHandler";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = await User.register(body);
    return Response.json({ message }, { status: 201 });
  } catch (error: unknown) {
    const {message, status} = errorHandler(error);
    return Response.json({ message }, { status });
  }
}
