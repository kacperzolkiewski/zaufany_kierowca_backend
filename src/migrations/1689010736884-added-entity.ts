import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1689010736884 implements MigrationInterface {
    name = 'AddedEntity1689010736884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetToken" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_bffe933a388d6bde48891ff95ab" UNIQUE ("passwordResetToken")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_9cc4efd049e1121ebfdbaee5b6d" UNIQUE ("verificationCode")`);
        await queryRunner.query(`CREATE INDEX "passwordResetToken_index" ON "users" ("passwordResetToken") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."passwordResetToken_index"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_9cc4efd049e1121ebfdbaee5b6d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bffe933a388d6bde48891ff95ab"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetToken"`);
    }

}
