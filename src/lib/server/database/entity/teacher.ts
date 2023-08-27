import { ChildEntity, Column, EntitySchema } from "typeorm";
import type Teacher from "$lib/shared/domain/teacher";
import AccountEntity from "./account";

@ChildEntity("teacher")
class TeacherEntity extends AccountEntity implements Teacher {
  @Column("text", { unique: true })
  email: string;

  @Column("text")
  passwordHash: string;
}

export default TeacherEntity;
