import { inject, injectable } from "tsyringe";
import type { ISettingRepository } from "../repositories/setting_repository";

@injectable()
export default class SettingsService {
  constructor(@inject("ISettingRepository") private repo: ISettingRepository) {}
  async set(userId: number, name: String, value: String): Promise<void> {
    if (value === "") {
      await this.repo.deleteSetting(userId, name);
    } else {
      await this.repo.setSetting(userId, name, value);
    }
  }
  async get(userId: number, name: String): Promise<String> {
    const setting = await this.repo.getSetting(userId, name);
    return setting?.value ?? "";
  }
}
