import TeacherForm from "$lib/shared/forms/emailPasswordForm";
import { formHandler } from "$lib/server/api_routes_config/form_handler";
import AuthService from "$lib/server/services/teacher_auth_service";
import { container } from "tsyringe";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { HTTPS } from "$env/static/private";

const authService = container.resolve(AuthService);

export const POST: RequestHandler = formHandler(
  async ({ params, url, cookies }) => {
    const jwtString = await authService.signInTeacher(
      params.form.email,
      params.form.password
    );
    if (url.searchParams.get("cookies")?.toLocaleLowerCase() === "true") {
      cookies.set("AuthorizationToken", `Bearer ${jwtString}`, {
        path: "/",
        httpOnly: true, // cookie kann nicht im client bearbeitet/eingesehen werden
        secure: HTTPS === "TRUE",
        sameSite: "strict",
      });
      return new Response(null, { status: 204 });
    }
    return json(jwtString, { status: 200 });
  },
  TeacherForm
);
