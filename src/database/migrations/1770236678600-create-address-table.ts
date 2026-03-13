import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1770236678600 implements MigrationInterface {
    name = 'CreateAddressTable1770236678600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip_code" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."profile_user_type_enum" RENAME TO "profile_user_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."profile_user_type_enum" AS ENUM('admin', 'client', 'deliveryman')`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "user_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "user_type" TYPE "public"."profile_user_type_enum" USING "user_type"::"text"::"public"."profile_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "user_type" SET DEFAULT 'client'`);
        await queryRunner.query(`DROP TYPE "public"."profile_user_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."profile_user_type_enum_old" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "user_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "user_type" TYPE "public"."profile_user_type_enum_old" USING "user_type"::"text"::"public"."profile_user_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "user_type" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."profile_user_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."profile_user_type_enum_old" RENAME TO "profile_user_type_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
