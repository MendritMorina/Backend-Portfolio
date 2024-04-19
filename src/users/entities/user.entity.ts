import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('users')
export class User extends BaseEntity {
  @Column()
  username?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;
}
