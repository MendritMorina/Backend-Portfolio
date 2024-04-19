import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('about')
export class About extends BaseEntity {
  @Column()
  imageUrl?: string;

  @Column()
  descriptionOne?: string;

  @Column()
  descriptionTwo?: string;

  @Column("text", { array: true })
  skills: string[];
}
