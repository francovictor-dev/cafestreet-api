import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProfileRelation1770238238882 implements MigrationInterface {
    name = 'FixProfileRelation1770238238882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3320d4391aa451ca3c4d9e93141" FOREIGN KEY ("profile_id") REFERENCES "profile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3320d4391aa451ca3c4d9e93141"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "profile_id"`);
    }

}
