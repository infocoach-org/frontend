import type Setting from "$lib/shared/domain/setting";
import { inject, injectable, singleton } from "tsyringe";
import { DataSource, Equal, type Repository } from "typeorm";
import SettingEntity from "../database/entity/setting";

export interface ISettingRepository {
  getSetting(settingName: String): Promise<Setting | null>;
  setSetting(settingName: String, value: String): Promise<void>;
  deleteSetting(settingName: String): Promise<void>;
}

@singleton()
@injectable()
export class SettingRepository implements ISettingRepository {
  private repo: Repository<Setting>;
  constructor(@inject(DataSource) dataSource: DataSource) {
    this.repo = dataSource.getRepository(SettingEntity);
  }

  async getSetting(settingName: string): Promise<Setting | null> {
    return await this.repo.findOneBy({ name: settingName });
  }
  async setSetting(settingName: string, value: string): Promise<void> {
    this.repo.save({ name: settingName, value });
  }
  async deleteSetting(settingName: string): Promise<void> {
    this.repo.delete({ name: Equal(settingName) });
  }
}
