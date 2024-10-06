import { Injectable, Scope } from '@nestjs/common';

import { CreateUserRequest } from './CreateUserDto';
import { BaseUseCaseTemplate } from '../../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../../share/status/StatusCode';
import UserRepository from '@//infra/repositories/UserRepository';

@Injectable({
  scope: Scope.REQUEST
})
export default class CreateUserUseCase extends BaseUseCaseTemplate<CreateUserRequest, object> {
  constructor(private userRepository: UserRepository) {
    super();
  }
  protected async processTransactions(): Promise<void> {}

  protected async process(): Promise<void> {
    const result = await this.userRepository.upsert({
      fullName: this.body.fullName,
      email: this.body.email,
      password: this.body.password,
      cpf: this.body.cpf,
      isActive: this.body.isActive
    });
    this.setResponseBody(result);
    this.setResponseStatusCode(StatusCode.created);
  }
}
