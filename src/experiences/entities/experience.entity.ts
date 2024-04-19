import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('experiences')
export class Experience extends BaseEntity {
  @Column()
  title?: string;

  @Column()
  period?: string;

  @Column()
  company?: string;

  @Column()
  description?: string;
}
