import type Account from "./account";

export default interface Teacher extends Account {
  email: string;
  passwordHash: string;
}
