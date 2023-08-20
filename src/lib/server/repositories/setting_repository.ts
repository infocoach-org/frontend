import type Setting from "$lib/domain/setting";
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

  async getSetting(settingName: String): Promise<Setting | null> {
    return await this.repo.findOneBy({ name: Equal(settingName) });
  }
  async setSetting(settingName: String, value: String): Promise<void> {
    this.repo.save({ name: settingName, value });
  }
  async deleteSetting(settingName: String): Promise<void> {
    this.repo.delete({ name: Equal(settingName) });
  }
}
