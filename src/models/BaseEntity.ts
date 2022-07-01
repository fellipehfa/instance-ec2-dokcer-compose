import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import type { DeepPartial } from 'typeorm';
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

const ID_LENGTH = 16;

export class BaseEntity<T> {
  constructor(partialObject?: DeepPartial<T>) {
    Object.assign(this, partialObject);
  }

  @IsString()
  @PrimaryColumn({ length: ID_LENGTH })
  id: string;

  @Expose({ groups: ['showDate'] })
  @CreateDateColumn()
  createdDate?: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate?: Date;

  @Exclude()
  // flag to prevent EntityValidator from acting on the entity
  _doNotValidate: boolean;

  @BeforeInsert()
  async generateId() {
    if (!this.id) {
      this.id = await uuid();
    }
  }
}
