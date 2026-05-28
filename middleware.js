// The lib folder stands for "library." It is used to store helper functions, utilities,
//  or modules that are shared across your project. 
// These files are not pages or components, but reusable code that supports your app’s main features.

// The middleware.js file in a Next.js app runs code before a request is completed. It can:
// Check if a user is logged in before showing a page.
// Redirect users to different pages.
// Block or allow access to certain routes.
// Change the request or response.
// It helps control what happens when someone visits your site.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/editor(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Get the authenticated user ID
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}