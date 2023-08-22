import { EntitySchema } from "typeorm";
import type Teacher from "$lib/shared/domain/teacher";

const TeacherEntity = new EntitySchema<Teacher>({
  name: "teachers",
  columns: {
    accountId: {
      type: Number,
      primary: true,
    },
    email: {
      type: String,
      unique: true,
    },
    passwordHash: {
      type: String,
    },
  },
  relations: {
    accountId: {
      type: "one-to-one",
      target: "users",
    },
  },
});

export default TeacherEntity;
