import { EntitySchema } from "typeorm";
import type Teacher from "$lib/shared/domain/teacher";

const TeacherEntity = new EntitySchema<Teacher>({
  name: "teachers",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
    },
    passwordHash: {
      type: String,
    },
  },
});

export default TeacherEntity;
