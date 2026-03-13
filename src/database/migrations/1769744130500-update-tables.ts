import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1769744130500 implements MigrationInterface {
    name = 'UpdateTables1769744130500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("user_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a28028ba709cd7e5053a86857b4" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."profile_user_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "profile" ("user_id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "user_type" "public"."profile_user_type_enum" NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d752442f45f258a8bdefeebb2f2" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deliveryman" ("user_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32ab7ae23db6d793dd010632a00" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "photo_url" character varying NOT NULL, "amount" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deliveryman_id" integer, "client_id" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("user_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f18a6fabea7b2a90ab6bf10a650" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "star" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" integer, "client_id" integer, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_a28028ba709cd7e5053a86857b4" FOREIGN KEY ("user_id") REFERENCES "profile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_446ade9fee98ccc7cf8e8fcfc4d" FOREIGN KEY ("deliveryman_id") REFERENCES "deliveryman"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0" FOREIGN KEY ("client_id") REFERENCES "client"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650" FOREIGN KEY ("user_id") REFERENCES "profile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_2432a0d3bcc975f29eb1e43456b" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a364bd0ab6bc4d8eec134c87add" FOREIGN KEY ("client_id") REFERENCES "client"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a364bd0ab6bc4d8eec134c87add"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_2432a0d3bcc975f29eb1e43456b"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_446ade9fee98ccc7cf8e8fcfc4d"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_a28028ba709cd7e5053a86857b4"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "deliveryman"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "public"."profile_user_type_enum"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
