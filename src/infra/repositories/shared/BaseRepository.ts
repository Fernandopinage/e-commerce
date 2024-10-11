import { EntityManager } from 'typeorm';

export abstract class BaseRepository {
  protected entityManager: EntityManager;

  setEntityManager(entityManager: EntityManager): void {
    this.entityManager = entityManager;
  }

  //   static getPagination(page: number, perPage: number) {
  //     return PageUtils.getPagination(page, perPage);
  //   }
}

export interface IListReturn<TEntity> {
  list: TEntity[];
  total: number;
}
