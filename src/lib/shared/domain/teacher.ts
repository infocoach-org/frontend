import Account from "./account";

export default class Teacher extends Account {
  constructor(public email: string, public passwordHash: string) {
    super();
  }
}
