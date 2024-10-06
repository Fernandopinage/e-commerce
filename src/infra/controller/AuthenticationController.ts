import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticationRequest } from '@//app/usecase/authentication/AuthenticationDto';
import AuthenticationUseCase from '@//app/usecase/authentication/AuthenticationUseCase';

@Controller('login')
export default class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUseCase) {}
  @Post()
  async create(
    @Body() body: AuthenticationRequest,
    @Res()
    @Req()
    res: Response
  ) {
    const response = await this.authenticationUseCase.execute({
      body
    });
    res.status(response.statusCode).json(response.body);
  }
}
