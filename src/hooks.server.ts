import "reflect-metadata";

import { initializeServices } from "$lib/server/initServices";
import {
  error,
  redirect,
  type Handle,
  type HandleServerError,
} from "@sveltejs/kit";
import { JWT_SECRET } from "$env/static/private";
import jwt, { type JwtPayload } from "jsonwebtoken";
import UserType from "$lib/shared/domain/user_type";

await initializeServices();

const noAuthRoutes = ["/api/teacher/login", "/login", "/sign-up", "/sign-in"];

function needsAuth(pathname: string): boolean {
  for (const noAuthRoute of noAuthRoutes) {
    if (pathname === noAuthRoute) {
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
    throw error(401);
  }
  const rawJWT = authCookie[1];
  let jwtPayload: JwtPayload;
  try {
    jwtPayload = jwt.verify(rawJWT, JWT_SECRET, {
      complete: false,
    }) as JwtPayload;
  } catch (e) {
    throw redirect(307, "/sign-in");
  }
  event.locals.userData = {
    userId: jwtPayload.user_id,
    userType: UserType.teacher,
  };

  const response = await resolve(event);
  return response;
};

export const handleError: HandleServerError = async () => {};

// TODO: handle and handleFetch

// TODO: handle errors from zod and typeorm and custom service or repo errors
