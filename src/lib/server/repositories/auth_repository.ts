import type JWTUserData from "$lib/shared/domain/user_data";
import { DataSource, Repository } from "typeorm";
import TeacherEntity from "../database/entity/teacher";
import type Teacher from "$lib/shared/domain/teacher";
import { inject, injectable, singleton } from "tsyringe";
import bcrypt from "bcrypt";
import { error } from "@sveltejs/kit";
import UserType from "$lib/shared/domain/user_type";
import type Account from "$lib/shared/domain/account";
import UserEntity from "../database/entity/user";

export interface IAuthRepository {
  signUpTeacher(email: string, password: string): Promise<void>;
  signInTeacher(email: string, password: string): Promise<JWTUserData>;
  signInParticipant(code: string): Promise<JWTUserData>;
}

@singleton()
@injectable()
export class AuthRepository implements IAuthRepository {
  private teacherRepo: Repository<Teacher>;
  private userRepo: Repository<Account>;

  constructor(@inject(DataSource) dataSource: DataSource) {
    this.teacherRepo = dataSource.getRepository(TeacherEntity);
    this.userRepo = dataSource.getRepository(UserEntity);
  }

  async signUpTeacher(email: string, password: string): Promise<void> {
    const teacherWithSameEmail = await this.teacherRepo.findOneBy({ email });
    if (teacherWithSameEmail) {
      throw error(403);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create();
    await this.userRepo.save(user);
    await this.teacherRepo.insert({ accountId: user.id, email, passwordHash });
  }
  async signInTeacher(email: string, password: string): Promise<JWTUserData> {
    const teacher = await this.teacherRepo.findOneBy({ email });
    if (!teacher) {
      throw error(401);
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      teacher!.passwordHash
    );
    if (!passwordCorrect) {
      throw error(401);
    }
    return { userId: teacher.accountId, userType: UserType.teacher };
  }
  async signInParticipant(code: string): Promise<JWTUserData> {
    throw "";
  }
}
