import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes - only dashboard, not admin
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth.protect();
  }
}, { debug: process.env.NODE_ENV === 'development' });

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/__clerk/:path*',
  ],
};
