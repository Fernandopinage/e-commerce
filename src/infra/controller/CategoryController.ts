import { Body, Post, Req, Res, Headers, Controller, Get, Query } from '@nestjs/common';
import { Response } from 'express';

import { RequestWithLoggedUser } from './shared/IRequestLoggedUser';
import { CreateCategoryRequest } from '@//app/usecase/category/create-category/CreateCategoryRequest';
import { CreateCategoryUseCase } from '@//app/usecase/category/create-category/CreateCategoryUseCase';
import { HttpHeadersRequest } from '@//app/usecase/share/http/HttpRequest';
import { ListCategoryRequest } from '@/app/usecase/category/list-category/ListCategoryDto';
import ListCategoryUseCase from '@/app/usecase/category/list-category/ListCategoryUseCase';

@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoryUseCase: ListCategoryUseCase
  ) {}
  @Get()
  async list(
    @Headers() headers: HttpHeadersRequest,
    @Body() body: ListCategoryRequest,
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
    @Req() req: RequestWithLoggedUser,
    @Res() res: Response
  ) {
    const response = await this.listCategoryUseCase.execute({
      body: {
        page: parseInt(page, 10) || 1,
        perPage: parseInt(perPage, 10) || 10
      },
      headers,
      loggedUser: req.loggedUser
    });
    console.log('>>>>', response);
    res.status(response.statusCode).json(response.body);
  }

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
