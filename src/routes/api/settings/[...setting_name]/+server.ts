import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { container } from "tsyringe";
import SettingsService from "$lib/server/services/settings_service";
import SettingValue from "$lib/shared/forms/settingValue";

const settingsService = container.resolve(SettingsService);

export const GET: RequestHandler = async ({ params, locals }) => {
  const value = await settingsService.get(
    locals.accountInfo!.id,
    params.setting_name
  );
  return json(value, { status: 200 });
};

export const PUT: RequestHandler = async ({ params, request, locals }) => {
  const value = SettingValue.parse(await request.json());
  await settingsService.set(locals.accountInfo!.id, params.setting_name, value);
  return new Response(null, { status: 204 });
};
