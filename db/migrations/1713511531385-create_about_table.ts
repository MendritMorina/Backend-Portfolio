import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAboutTable1713511531385 implements MigrationInterface {
    name = 'CreateAboutTable1713511531385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "about" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "imageUrl" character varying NOT NULL, "descriptionOne" character varying NOT NULL, "descriptionTwo" character varying NOT NULL, "skills" text array NOT NULL, CONSTRAINT "PK_d84ee214fb7c3286f24db5b2422" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "about"`);
    }

}
