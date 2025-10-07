import { ZodError } from "zod";
import User from "../../../server/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await User.register(body);
    return Response.json({ message }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
    const issues = error.issues;
      let messages = "";
      issues.forEach((issue) => {
        messages += `${issue.path} - ${issue.message}, `;
      });

      return Response.json({ messages }, { status: 400 });
    } else {
      return Response.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
