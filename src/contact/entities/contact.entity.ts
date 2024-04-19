import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column()
  name?: string;

  @Column()
  lastName?: string;

  @Column()
  email?: string;

  @Column()
  message?: string;
}
