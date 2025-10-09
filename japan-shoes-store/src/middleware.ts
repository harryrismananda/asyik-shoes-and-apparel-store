import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./server/helpers/errorHandler";
import { UnauthorizedError } from "./server/helpers/customError";
import * as jose from "jose";

export async function middleware(req: NextRequest){
try {
  const api = req.nextUrl.pathname.startsWith('/api');
  // const {slug} = await params
  // console.log(req.nextUrl.pathname);
  const protectedRoutes = ["/api/wishlists"];
  if(api){
    if(protectedRoutes.includes(req.nextUrl.pathname) || req.nextUrl.pathname.startsWith("/api/wishlists/")){
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")
    if(!token) throw new UnauthorizedError("Authentication required, please login");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = token.value
    const { payload } = await jose.jwtVerify<{id: string, username: string}>(jwt, secret);
    // console.log("<<< ini payload di middleware", payload);
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-user-id', payload.id)
    requestHeaders.set("x-user-name", payload.username)
    
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    })
    return response

    }
  }
  
} catch (error:unknown) {
  // console.log("<<< ini error di middleware", error);
  const {message, status} = errorHandler(error);
  return Response.json({ message }, { status });
}
}