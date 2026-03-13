import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductsDescriptionFields1772124520679 implements MigrationInterface {
    name = 'UpdateProductsDescriptionFields1772124520679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveryman" DROP CONSTRAINT "FK_cdded2659d6e786b2088abd3741"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "deliveryman" ADD CONSTRAINT "FK_cdded2659d6e786b2088abd3741" FOREIGN KEY ("profile_id") REFERENCES "profile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveryman" DROP CONSTRAINT "FK_cdded2659d6e786b2088abd3741"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "deliveryman" ADD CONSTRAINT "FK_cdded2659d6e786b2088abd3741" FOREIGN KEY ("profile_id") REFERENCES "profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
