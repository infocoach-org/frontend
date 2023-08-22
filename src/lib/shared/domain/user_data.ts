import type UserType from "./user_type";

export default interface JWTUserData {
  userId: number;
  userType: UserType;
}
