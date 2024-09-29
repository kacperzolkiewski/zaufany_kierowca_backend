import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1702745960680 implements MigrationInterface {
    name = 'AddedEntity1702745960680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "UQ_b98137e2847bce98273c24b44e9" UNIQUE ("latitude", "longitude"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "originAdress"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "destinationAdress"`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "distanceInKm" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "originAddressId" uuid`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "destinationAddressId" uuid`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_f2a4a82b07e1b198a54874399d7" FOREIGN KEY ("originAddressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_f12e6a2d039b300b0bf03a0cac0" FOREIGN KEY ("destinationAddressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_f12e6a2d039b300b0bf03a0cac0"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_f2a4a82b07e1b198a54874399d7"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "destinationAddressId"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "originAddressId"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "distanceInKm"`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "destinationAdress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "originAdress" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
