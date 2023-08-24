import { EntitySchema } from "typeorm";
import Account from "$lib/shared/domain/account";

//https://github.com/typeorm/typeorm/issues/7323
const AccountEntity = new EntitySchema<Account>({
  name: "account",
  target: Account,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      nullable: false,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    type: {
      type: String,
      // type: "enum",
      // enum: AccountType,
    },
  },
  inheritance: {
    pattern: "STI",
    column: "type",
  },
});

// @Entity()
// @TableInheritance({ column: { type: "varchar", name: "type" } })
// export class AccountEntity implements Account {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column()
//   createdAt: Date;
// }

export default AccountEntity;
