export { middleware } from "wix-smarts/nextjs/authentication/middleware";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  unstable_allowDynamic: ["**/node_modules/lodash/**"],
};
