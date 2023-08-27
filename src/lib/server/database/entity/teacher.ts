import { ChildEntity, Column } from "typeorm";
import type Teacher from "$lib/server/domain/teacher";
import AccountEntity from "./account";
import AccountType from "$lib/shared/domain/account_type";

@ChildEntity(AccountType.teacher)
class TeacherEntity extends AccountEntity implements Teacher {
  @Column("text", { unique: true })
  email: string;

  @Column("text")
  passwordHash: string;
}

export default TeacherEntity;
