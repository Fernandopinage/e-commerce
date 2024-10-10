import { Body, Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Response } from 'express';

import { HttpHeadersRequest } from '@//app/usecase/share/http/HttpRequest';
import { CreateUserRequest } from '@//app/usecase/user/created-user/CreateUserDto';
import CreateUserUseCase from '@//app/usecase/user/created-user/CreateUserUseCase';

@Controller('user')
export default class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  async create(
    @Headers() headers: HttpHeadersRequest,
    @Body() body: CreateUserRequest,
    @Res()
    @Req()
    res: Response
  ) {
    const response = await this.createUserUseCase.execute({
      body,
      headers
    });
    res.status(response.statusCode).json(response.body);
  }
}
