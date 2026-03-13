import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1770757520611 implements MigrationInterface {
    name = 'UpdateProduct1770757520611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveryman" ADD "profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "deliveryman" ADD CONSTRAINT "UQ_cdded2659d6e786b2088abd3741" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "deliveryman" ADD CONSTRAINT "FK_cdded2659d6e786b2088abd3741" FOREIGN KEY ("profile_id") REFERENCES "profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveryman" DROP CONSTRAINT "FK_cdded2659d6e786b2088abd3741"`);
        await queryRunner.query(`ALTER TABLE "deliveryman" DROP CONSTRAINT "UQ_cdded2659d6e786b2088abd3741"`);
        await queryRunner.query(`ALTER TABLE "deliveryman" DROP COLUMN "profile_id"`);
    }

}
