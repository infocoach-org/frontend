import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import { container } from "tsyringe";
import SettingsService from "$lib/server/services/settings_service";

const SettingValue = z.string().min(1);

const settingsService = container.resolve(SettingsService);

export const GET: RequestHandler = async ({ params }) => {
  const value = await settingsService.get(params.setting_name);
  return json(value, { status: 200 });
};

export const PUT: RequestHandler = async ({ params, request }) => {
  const value = SettingValue.parse(await request.json());
  await settingsService.set(params.setting_name, value);
  return new Response(null, { status: 204 });
};
