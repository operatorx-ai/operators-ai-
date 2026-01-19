import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect /app and /org routes
    '/app/:path*',
    '/org/:path*',
    // Always run for API routes
    '/api/:path*',
    '/trpc/:path*',
  ],
};
