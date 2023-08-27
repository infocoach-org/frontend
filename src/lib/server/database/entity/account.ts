import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import type Account from "$lib/server/domain/account";
import AccountType from "$lib/shared/domain/account_type";

//https://github.com/typeorm/typeorm/issues/7323

@Entity("account")
@TableInheritance({ column: "type" })
class AccountEntity implements Account {
  @PrimaryGeneratedColumn("identity", { generatedIdentity: "ALWAYS" })
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ type: "enum", enum: AccountType })
  type: AccountType;
}

export default AccountEntity;
