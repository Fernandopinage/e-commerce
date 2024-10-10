import { Body, Post, Req, Res, Headers, Controller } from '@nestjs/common';
import { Response } from 'express';

import { RequestWithLoggedUser } from './shared/IRequestLoggedUser';
import { CreateCategoryRequest } from '@//app/usecase/category/create-category/CreateCategoryRequest';
import { CreateCategoryUseCase } from '@//app/usecase/category/create-category/CreateCategoryUseCase';
import { HttpHeadersRequest } from '@//app/usecase/share/http/HttpRequest';

@Controller('category')
export class CategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  @Post()
  async create(
    @Headers() headers: HttpHeadersRequest,
    @Body() body: CreateCategoryRequest,
    @Res() res: Response,
    @Req() req: RequestWithLoggedUser
  ) {
    const response = await this.createCategoryUseCase.execute({
      body,
      headers,
      loggedUser: req.loggedUser
    });
    res.status(response.statusCode).json(response.body);
  }
}
