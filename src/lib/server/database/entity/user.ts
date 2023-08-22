import { EntitySchema } from "typeorm";
import type Account from "$lib/shared/domain/account";

const UserEntity = new EntitySchema<Account>({
  name: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
  },
});

export default UserEntity;
