import { Injectable, Scope } from '@nestjs/common';

import { ListCategoryRequest } from './ListCategoryDto';
import BaseValidatorAuthTemplate from '../../share/validator/BaseValidatorTemplate';

@Injectable({ scope: Scope.REQUEST })
export class ListCategoryValidator extends BaseValidatorAuthTemplate<ListCategoryRequest, void> {
  constructor() {
    super();
  }
  protected async validate(): Promise<void> {
    return;
  }
  protected async loadEntities(): Promise<void> {
    return;
  }
}
