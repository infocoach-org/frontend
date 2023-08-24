import { container } from "tsyringe";
import { dataSource } from "./database";
import { DataSource } from "typeorm";
import { SettingRepository } from "./repositories/setting_repository";
import { AuthRepository } from "./repositories/auth_repository";
import AccountEntity from "./database/entity/account";

export async function initializeServices() {
  console.log("started initializing");
  try {
    await dataSource.initialize();
    container.register(DataSource, {
      useValue: dataSource,
    });
    container.register("ISettingRepository", SettingRepository);
    container.register("IAuthRepository", AuthRepository);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  console.log("finished initializing");
}
