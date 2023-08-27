import {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  INFO_LOGGING,
} from "$env/static/private";

import { DataSource } from "typeorm";
import SettingEntity from "./entity/setting";
import TeacherEntity from "./entity/teacher";
import AccountEntity from "./entity/account";

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  logging: INFO_LOGGING === "TRUE" ? "all" : ["error", "warn", "migration"],
  synchronize: true,
  entities: [SettingEntity, TeacherEntity, AccountEntity],
  // entities: [__dirname + "/entity/setting.ts"],
});
