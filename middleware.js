import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ['/api/webhooks/clerk', '/api/uploadthing','/blogs','/','/spaces'],
    ignoredRoutes: ['/api/webhooks/clerk', '/api/uploadthing','/blogs','/spaces']
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


