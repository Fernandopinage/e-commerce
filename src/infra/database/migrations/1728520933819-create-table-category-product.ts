import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategoryProduct1728520933819 implements MigrationInterface {
  name = 'CreateTableCategoryProduct1728520933819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "category_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category_id"`);
  }
}
