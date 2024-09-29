import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1702761623465 implements MigrationInterface {
    name = 'AddedEntity1702761623465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "distanceInKm"`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "distanceInKm" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "distanceInKm"`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "distanceInKm" integer NOT NULL`);
    }

}
