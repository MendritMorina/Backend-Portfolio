import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('intro')
export class Intro extends BaseEntity {
  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column()
  content?: string;

  @Column({nullable: true})
  pdfUrl?: string;
}
