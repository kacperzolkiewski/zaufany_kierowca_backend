import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1698088947041 implements MigrationInterface {
    name = 'AddedEntity1698088947041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "photo" TO "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "imageUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "imageUrl" character varying NOT NULL DEFAULT 'default.png'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "imageUrl" TO "photo"`);
    }

}
