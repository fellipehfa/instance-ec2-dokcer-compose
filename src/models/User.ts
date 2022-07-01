import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

// export class UserRole {
//   static readonly USER = 'USER';
//   static readonly BUSINESS = 'BUSINESS';
//   static readonly ADMINISTRATOR = 'ADMINISTRATOR';
// }

@Entity('users')
export class User extends BaseEntity<User> {
  // @IsEnum(UserRole, { always: true })
  // @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  // role: UserRole;

  @IsString({ always: true })
  @Length(4, 20, { always: true })
  @Column({ type: 'varchar', length: 20, unique: true })
  userName: string;

  @IsOptional({ always: true })
  @Length(6, 255, { always: true })
  @Column({ length: 60, nullable: true })
  password: string;

  currentPassword: string; // for validation when changing passwords

  @IsString({ always: true })
  @Length(3, 150, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordResetCode: string | null;

  // @OneToMany(type => Session, session => session.user)
  // sessions: Session[];

  // @OneToMany(type => UserDevice, device => device.user)
  // devices: UserDevice[];

  // @Exclude()
  // playerId?: string; // used for app login

  @Exclude()
  currentToken: string; // used for logout

  async validatePassword(password: string): Promise<boolean> {
    if (await bcrypt.compare(password, this.password)) {
      return true;
    }

    return false;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (
      this.password &&
      (!this.password.startsWith('$2b$12$') || this.password.length !== 60)
    ) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
