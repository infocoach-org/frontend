import type Setting from "$lib/shared/domain/setting";
import { EntitySchema } from "typeorm";

const SettingEntity = new EntitySchema<Setting>({
  name: "setting",
  columns: {
    name: {
      type: String,
      primary: true,
    },
    value: {
      type: String,
    },
  },
});

export default SettingEntity;
