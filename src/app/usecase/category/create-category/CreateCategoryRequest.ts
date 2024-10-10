import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCategoryRequest {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  parentCategoryId: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 11)
  status: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
export class CreateCategoryResponse {}
