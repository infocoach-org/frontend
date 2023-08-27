import TeacherForm from "$lib/shared/forms/emailPasswordForm";
import { formHandler } from "$lib/server/api_routes_config/form_handler";
import AuthService from "$lib/server/services/teacher_auth_service";
import { container } from "tsyringe";
import type { RequestHandler } from "./$types";

const authService = container.resolve(AuthService);

export const POST: RequestHandler = formHandler(async ({ params }) => {
  console.log("as");
  await authService.signUpTeacher(params.form.email, params.form.password);
  return new Response(null, { status: 204 });
}, TeacherForm);
