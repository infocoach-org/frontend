import "reflect-metadata";

import { initializeServices } from "$lib/server/initServices";
import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import { JWT_SECRET } from "$env/static/private";
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  type JwtPayload,
} from "jsonwebtoken";
import AccountType from "$lib/shared/domain/account_type";

await initializeServices();

const noAuthRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/settings/*",
  "/api/teacher/sign-in",
  "/api/teacher/sign-up",
];

function needsAuth(pathname: string): boolean {
  for (const noAuthRoute of noAuthRoutes) {
    if (noAuthRoute.endsWith("/*")) {
      if (pathname.startsWith(noAuthRoute.slice(0, noAuthRoute.length - 2))) {
        return false;
      }
    } else if (pathname === noAuthRoute) {
      return false;
    }
  }
  return true;
}

export const handle: Handle = async ({ event, resolve }) => {
  if (!needsAuth(event.url.pathname)) {
    return await resolve(event);
  }
  const authCookie = event.cookies.get("AuthorizationToken")?.split(" ");
  if (!authCookie || authCookie.length !== 2) {
    // no token
    throw redirect(307, "/sign-in");
  }
  const rawJWT = authCookie[1];
  let jwtPayload: JwtPayload;
  try {
    jwtPayload = jwt.verify(rawJWT, JWT_SECRET, {
      complete: false,
    }) as JwtPayload;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      // token has expired
    } else if (e instanceof JsonWebTokenError) {
      // token wrong
    }
    throw redirect(307, "/sign-in");
  }
  event.locals.userData = {
    id: jwtPayload.user_id,
    type: AccountType.teacher,
  };

  const response = await resolve(event);
  return response;
};

// export const handleError: HandleServerError = async () => {};

// TODO: handle and handleFetch

// TODO: handle errors from zod and typeorm and custom service or repo errors
