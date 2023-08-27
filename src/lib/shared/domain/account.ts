import type AccountType from "./account_type";

export default interface Account {
  id: number;
  createdAt: Date;
  type: AccountType;
}
