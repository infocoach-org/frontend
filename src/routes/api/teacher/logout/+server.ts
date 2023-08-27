import type { RequestHandler } from "./$types";
import { HTTPS } from "$env/static/private";

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.delete("AuthorizationToken", {
    path: "/",
    httpOnly: true,
    secure: HTTPS === "TRUE",
    sameSite: "strict",
  });
  return new Response(null, { status: 204 });
};
