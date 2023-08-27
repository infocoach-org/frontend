import type Account from "./account";

export default interface Teacher extends Account {
  readonly email: string;
  readonly passwordHash: string;
}
