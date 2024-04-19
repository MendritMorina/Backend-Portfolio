import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExperienceTable1713511645068 implements MigrationInterface {
    name = 'CreateExperienceTable1713511645068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experiences" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "period" character varying NOT NULL, "company" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2508c8e5b17ba0a954d5890b77a" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "experiences"`);
    }

}
