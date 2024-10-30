import { Body, Post, Req, Res, Headers, Controller } from '@nestjs/common';
import { Response } from 'express';

import { RequestWithLoggedUser } from './shared/IRequestLoggedUser';
import { HttpHeadersRequest } from '@//app/usecase/share/http/HttpRequest';
import { CreateProductRequest } from '@/app/usecase/product/create-product/CreateProductDto';
import { CreateProductUseCase } from '@/app/usecase/product/create-product/CreateProductUseCase';

@Controller('product')
export class ProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async create(
    @Headers() headers: HttpHeadersRequest,
    @Body() body: CreateProductRequest,
    @Res() res: Response,
    @Req() req: RequestWithLoggedUser
  ) {
    const response = await this.createProductUseCase.execute({
      body,
      headers,
      loggedUser: req.loggedUser
    });
    res.status(response.statusCode).json(response.body);
  }
}
