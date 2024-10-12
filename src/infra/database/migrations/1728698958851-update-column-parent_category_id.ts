import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnParentCategoryId1728698958851 implements MigrationInterface {
  name = 'UpdateColumnParentCategoryId1728698958851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "parent_category_id" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "parent_category_id" SET NOT NULL`);
  }
}
