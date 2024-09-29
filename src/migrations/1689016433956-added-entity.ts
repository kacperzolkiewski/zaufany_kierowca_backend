import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1689016433956 implements MigrationInterface {
    name = 'AddedEntity1689016433956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetAt" TIMESTAMP`);
    }

}
