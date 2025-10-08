import { NextRequest } from "next/server";
import User from "../../../server/models/User";
import { errorHandler } from "@/server/helpers/errorHandler";

//post
export async function POST(request: NextRequest) {
  try {
    const body: { email: string; password: string } = await request.json();
    const { email, password } = body;

    const token = await User.login(email, password);
    return Response.json({ token }, { status: 200 });
  } catch (error:unknown) {
    const {message, status} = errorHandler(error);
    return Response.json({ message }, { status });
  }
}