import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  title?: string;

  @Column()
  period?: string;

  @Column({})
  description?: string;

  @Column()
  content?: string;

  @Column()
  imageUrl?: string;

  @Column()
  link?: string;

  @Column({default: false})
  personal?: boolean;

  @Column("text", { array: true, nullable:true})
  technologies?: string[];
}
