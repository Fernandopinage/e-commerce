import { Category } from '@/infra/database/models/Category.entity';

export class ListCategoryRequest {
  page?: number | string;
  perPage?: number | string;
}

export class ListCategoryResponse {
  list: Category[];
  total: number;
}
