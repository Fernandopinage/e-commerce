import { Body, Post, Req, Res, Headers, Controller } from '@nestjs/common';
import { Response } from 'express';

import { RequestWithLoggedUser } from './shared/IRequestLoggedUser';
import { HttpHeadersRequest } from '@//app/usecase/share/http/HttpRequest';
import { CreateSubCategoryDto } from '@/app/usecase/sub-category/create-sub-category/CreateSubCategoryDto';
import { CreateSubCategoryUseCase } from '@/app/usecase/sub-category/create-sub-category/CreateSubCategoryUseCase';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private createSubCategoryUseCase: CreateSubCategoryUseCase) {}

  @Post()
  async create(
    @Headers() headers: HttpHeadersRequest,
    @Body() body: CreateSubCategoryDto,
    @Res() res: Response,
    @Req() req: RequestWithLoggedUser
  ) {
    const response = await this.createSubCategoryUseCase.execute({
      body,
      headers,
      loggedUser: req.loggedUser
    });
    res.status(response.statusCode).json(response.body);
  }
}
