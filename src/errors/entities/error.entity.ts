import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../base.entity";

@Entity('errors')
export class ErrorLog extends BaseEntity {
    @Column({nullable:true})
    controllerName?: string;

    @Column({nullable:true})
    body?: string;

    @Column({nullable:true})
    method?: string;
}