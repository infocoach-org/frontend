import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} from "$env/static/private";

import { DataSource } from "typeorm";
import SettingEntity from "./entity/setting";
import TeacherEntity from "./entity/teacher";

export const dataSource = new DataSource({
  type: DB_TYPE as any,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [SettingEntity, TeacherEntity],
  // entities: [__dirname + "/entity/setting.ts"],
});
