import type AccountInfo from "$lib/shared/domain/account_info";
import { DataSource, Repository } from "typeorm";
import Teacher from "../database/entity/teacher";
import type Teacher from "$lib/shared/domain/teacher";
import { inject, injectable, singleton } from "tsyringe";
import bcrypt from "bcrypt";
import { error } from "@sveltejs/kit";
import AccountType from "$lib/shared/domain/account_type";
import type Account from "$lib/shared/domain/account";
import AccountEntity from "../database/entity/account";

export interface IAuthRepository {
  signUpTeacher(email: string, password: string): Promise<void>;
  signInTeacher(email: string, password: string): Promise<AccountInfo>;
  signInParticipant(code: string): Promise<AccountInfo>;
}

@singleton()
@injectable()
export class AuthRepository implements IAuthRepository {
  private teacherRepo: Repository<Teacher>;
  private accountRepo: Repository<Account>;

  constructor(@inject(DataSource) dataSource: DataSource) {
    this.teacherRepo = dataSource.getRepository(Teacher);
    this.accountRepo = dataSource.getRepository(AccountEntity);
  }

  async signUpTeacher(email: string, password: string): Promise<void> {
    const teacherWithSameEmail = await this.teacherRepo.findOneBy({ email });
    if (teacherWithSameEmail) {
      throw error(403);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await this.teacherRepo.insert({ email, passwordHash });
  }
  async signInTeacher(email: string, password: string): Promise<AccountInfo> {
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
    return { id: teacher.id, type: AccountType.teacher };
  }
  async signInParticipant(code: string): Promise<AccountInfo> {
    throw "";
  }
}
