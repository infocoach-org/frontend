import type AccountType from "./account_type";

export default abstract class Account {
  id: number;
  createdAt: Date;
  type: AccountType;
}
