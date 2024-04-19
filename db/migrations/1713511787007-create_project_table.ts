import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectTable1713511787007 implements MigrationInterface {
    name = 'CreateProjectTable1713511787007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "period" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying NOT NULL, "imageUrl" character varying NOT NULL, "link" character varying NOT NULL, "personal" boolean NOT NULL DEFAULT false, "technologies" text array, CONSTRAINT "PK_fabd2b68036a696c6be09845f42" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
