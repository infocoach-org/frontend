import { injectable, inject } from "tsyringe";
import type { IAuthRepository } from "../repositories/auth_repository";
import type UserData from "$lib/shared/domain/user_data";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

@injectable()
export default class AuthService {
  constructor(@inject("IAuthRepository") private repo: IAuthRepository) {}

  async getJWTSignInData(jwtString: string): Promise<UserData | null> {
    try {
      const jwtData = jwt.verify(jwtString, JWT_SECRET, { complete: true });
      return jwtData.payload as UserData;
    } catch (e) {
      return null;
    }
  }

  signUpTeacher(email: string, password: string): Promise<void> {
    return this.repo.signUpTeacher(email, password);
  }
  signInTeacher(email: string, password: string): Promise<string> {
    return this.repo.signInTeacher(email, password).then(this.getCodeFromData);
  }
  signInParticipant(code: string): Promise<string> {
    return this.repo.signInParticipant(code).then(this.getCodeFromData);
  }

  private getCodeFromData(userData: UserData): string {
    return jwt.sign(userData, JWT_SECRET);
  }
}
