import { container } from "tsyringe";
import { dataSource } from "./database";
import {
  type ISettingRepository,
  SettingRepository,
} from "./repositories/setting_repository";
import { DataSource } from "typeorm";

export async function initializeServices() {
  console.log("started initializing");
  try {
    await dataSource.initialize();
    container.register(DataSource, {
      useValue: dataSource,
    });
    container.register<ISettingRepository>(
      "ISettingRepository",
      SettingRepository
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  console.log("finished initializing");
}
