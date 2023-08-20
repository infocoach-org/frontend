import { inject, injectable, singleton } from "tsyringe";
import type { ISettingRepository } from "../repositories/setting_repository";

@injectable()
export default class SettingsService {
  constructor(@inject("ISettingRepository") private repo: ISettingRepository) {}
  async set(name: String, value: String): Promise<void> {
    if (name === "") {
      await this.repo.deleteSetting(name);
    } else {
      await this.repo.setSetting(name, value);
    }
  }
  async get(name: String): Promise<String> {
    const setting = await this.repo.getSetting(name);
    return setting?.value ?? "";
  }
}
