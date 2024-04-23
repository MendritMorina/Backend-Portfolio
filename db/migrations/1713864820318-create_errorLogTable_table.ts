import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateErrorLogTableTable1713864820318 implements MigrationInterface {
    name = 'CreateErrorLogTableTable1713864820318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "errors" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "controllerName" character varying, "body" character varying, "method" character varying, CONSTRAINT "PK_6f7b6e8d608bbac2d6696ee1bb5" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "errors"`);
    }

}
