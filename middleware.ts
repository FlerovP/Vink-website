import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except static files, api routes, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
