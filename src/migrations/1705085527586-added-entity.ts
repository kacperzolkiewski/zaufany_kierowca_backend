import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1705085527586 implements MigrationInterface {
    name = 'AddedEntity1705085527586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "firebaseToken" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firebaseToken"`);
    }

}
