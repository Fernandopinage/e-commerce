import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import AuthenticationUseCase from './authentication/AuthenticationUseCase';
import CreateUserUseCase from './user/created-user/CreateUserUseCase';
import { RepositoryModule } from '@//infra/repositories/RepositoryModule';

@Module({
  imports: [
    RepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [CreateUserUseCase, AuthenticationUseCase],
  exports: [CreateUserUseCase, AuthenticationUseCase]
})
export class UseCaseModule {}
