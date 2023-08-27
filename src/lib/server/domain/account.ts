import type AccountType from "../../shared/domain/account_type";

export default interface Account {
  readonly id: number;
  readonly createdAt: Date;
  readonly type: AccountType;
}
