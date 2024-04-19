import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIntroTable1713511350003 implements MigrationInterface {
    name = 'CreateIntroTable1713511350003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "intro" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying NOT NULL, "pdfUrl" character varying, CONSTRAINT "PK_5820f59592436547504f3c51ee4" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "intro"`);
    }

}
