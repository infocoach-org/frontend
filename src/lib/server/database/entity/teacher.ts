import { EntitySchema } from "typeorm";
import Teacher from "$lib/shared/domain/teacher";
import AccountEntity from "./account";

const TeacherEntity = new EntitySchema<Teacher>({
  name: "teacher",
  target: Teacher,
  type: "entity-child",
  columns: {
    ...AccountEntity.options.columns,
    email: {
      type: String,
      unique: true,
    },
    passwordHash: {
      type: String,
    },
  },
});

export default TeacherEntity;
