import type Setting from "$lib/shared/domain/setting";
import { inject, injectable, singleton } from "tsyringe";
import { DataSource, Equal, type Repository } from "typeorm";
import SettingEntity from "../database/entity/setting";
import AccountEntity from "../database/entity/account";

export interface ISettingRepository {
  getSetting(
    accountId: number,
    settingName: String
  ): Promise<SettingEntity | null>;
  setSetting(
    accountId: number,
    settingName: String,
    value: String
  ): Promise<void>;
  deleteSetting(accountId: number, settingName: String): Promise<void>;
}

@singleton()
@injectable()
export class SettingRepository implements ISettingRepository {
  private repo: Repository<SettingEntity>;
  private accountRepo: Repository<AccountEntity>;
  constructor(@inject(DataSource) dataSource: DataSource) {
    this.repo = dataSource.getRepository(SettingEntity);
    this.accountRepo = dataSource.getRepository(AccountEntity);
  }

  async getSetting(
    accountId: number,
    settingName: string
  ): Promise<SettingEntity | null> {
    return await this.repo.findOneBy({
      name: settingName,
      accountId: accountId,
    });
  }
  async setSetting(
    accountId: number,
    settingName: string,
    value: string
  ): Promise<void> {
    this.repo.save({
      name: settingName,
      accountId,
      value,
    });
  }
  async deleteSetting(accountId: number, settingName: string): Promise<void> {
    this.repo.delete({ name: settingName, accountId });
  }
}
