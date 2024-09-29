import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1696761281159 implements MigrationInterface {
    name = 'AddedEntity1696761281159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "opinions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "stars" integer NOT NULL, "comment" text NOT NULL, "receiverId" uuid, "giverId" uuid, CONSTRAINT "PK_40e5faf85211ee31acc8ed669ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "kilometersTraveled" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "opinions" ADD CONSTRAINT "FK_0884ef7131a34e5ff834bd33410" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opinions" ADD CONSTRAINT "FK_cafd6d3cdb9e3be42f1c3b4c953" FOREIGN KEY ("giverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opinions" DROP CONSTRAINT "FK_cafd6d3cdb9e3be42f1c3b4c953"`);
        await queryRunner.query(`ALTER TABLE "opinions" DROP CONSTRAINT "FK_0884ef7131a34e5ff834bd33410"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "kilometersTraveled"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
        await queryRunner.query(`DROP TABLE "opinions"`);
    }

}
