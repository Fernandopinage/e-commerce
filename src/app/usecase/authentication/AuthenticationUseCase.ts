import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthenticationPayload, AuthenticationRequest, AuthenticationResponse } from './AuthenticationDto';
import { AuthenticationValidator } from './AuthenticationValidator';
import { BaseUseCaseTemplate } from '../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../share/status/StatusCode';
import UserRepository from '@//infra/repositories/UserRepository';

@Injectable({ scope: Scope.REQUEST })
export default class AuthenticationUseCase extends BaseUseCaseTemplate<AuthenticationRequest, AuthenticationResponse> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    validator: AuthenticationValidator
  ) {
    super([userRepository], validator);
  }
  protected async process(): Promise<void> {
    const user = await this.userRepository.getBy({
      where: {
        email: this.body.email
      }
    });

    if (user && user.password === this.body.password) {
      const { id, fullName, email } = user;
      const body = this.genereteToken({
        id,
        fullName,
        email
      });

      this.setResponseBody(body);
      this.setResponseStatusCode(StatusCode.ok);
      return;
    }
    this.setResponseStatusCode(StatusCode.badRequest);
  }
  protected async processTransactions(): Promise<void> {}

  private genereteToken(payload: AuthenticationPayload) {
    return {
      token: `Bearer ` + this.jwtService.sign(payload)
    };
  }
}
