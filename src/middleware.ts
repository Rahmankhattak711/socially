import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicPaths = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  "/notifications",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const currentUrl = new URL(req.url);
  const isPublicPath = publicPaths(req);

  if (userId) {
    if (
      currentUrl.pathname === "/sign-in" ||
      currentUrl.pathname === "/sign-up"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (!userId) {
    if (isPublicPath) {
      return NextResponse.next();
    }

    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
