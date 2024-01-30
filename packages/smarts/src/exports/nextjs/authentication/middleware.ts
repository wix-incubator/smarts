import { OAuthStrategy, createClient } from "@wix/sdk-react";
import { WIX_REFRESH_TOKEN_COOKIE } from "../../../constants.js";
import { NextRequest, NextResponse } from "next/server.js";

/**
 * A NextJS middleware that handles Wix session management, ensuring Wix
 * sessions are persisted across requests.
 *
 * Wix sessions are persisted using a cookie. When a visitor first visits a
 * page on your site, this middleware will check if the visitor has a Wix
 * session cookie. If not, it will generate a new Wix visitor session and set the
 * cookie. In future requests, the middleware will ensure a Wix session cookie
 * exists and will renew the session as needed.
 *
 * @example
 * ```ts
 * export { middleware } from '@wix/smarts/nextjs/authentication/middleware';
 *
 * export const config = {
 *   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
 *   unstable_allowDynamic: ['**\/node_modules/lodash/**'],
 * }
 * ```
 *
 * @param request The incoming request
 * @returns A NextResponse object
 */
export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const res = NextResponse.next();
  if (cookies.get(WIX_REFRESH_TOKEN_COOKIE)) {
    return res;
  }

  if (!process.env.WIX_CLIENT_ID) {
    throw new Error(
      "WIX_CLIENT_ID environment variable is not set. Ensure you have set up your environment variables correctly."
    );
  }

  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.WIX_CLIENT_ID }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  res.cookies.set(
    WIX_REFRESH_TOKEN_COOKIE,
    JSON.stringify(tokens.refreshToken),
    {
      maxAge: 60 * 60 * 24 * 30,
    }
  );
  return res;
}
