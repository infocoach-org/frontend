import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import type Account from "$lib/server/domain/account";
import type Setting from "$lib/shared/domain/setting";

@Entity("setting")
class SettingEntity implements Setting {
  @PrimaryColumn("varchar")
  name: string;

  @PrimaryColumn("integer")
  accountId: number;

  @Column("text")
  @Check("value <> ''")
  value: string;

  @ManyToOne("account")
  @JoinColumn({ name: "accountId" })
  account: Promise<Account>;
}

export default SettingEntity;
