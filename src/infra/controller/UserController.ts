import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserRequest } from '@//app/usecase/user/created-user/CreateUserDto';
import CreateUserUseCase from '@//app/usecase/user/created-user/CreateUserUseCase';

@Controller('user')
export default class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  async create(
    @Body() body: CreateUserRequest,
    @Res()
    @Req()
    res: Response
  ) {
    const response = await this.createUserUseCase.execute({
      body
    });
    res.status(response.statusCode).json(response.body);
  }
}
