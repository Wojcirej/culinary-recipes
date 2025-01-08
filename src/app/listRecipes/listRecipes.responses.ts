import { HttpStatus } from '@nestjs/common';
import {
  ListRecipesResponse,
  ListRecipesResponseObject,
  PaginationParams,
} from './listRecipes.interfaces';

export class ListRecipesSuccessResponse implements ListRecipesResponse {
  private readonly data: Array<any>;
  private readonly paginationParams: PaginationParams;

  constructor(data: Array<any>, paginationParams: PaginationParams) {
    this.data = data;
    this.paginationParams = paginationParams;
  }

  public getResponse(): ListRecipesResponseObject {
    return {
      status: HttpStatus.OK,
      payload: {
        data: this.data,
        meta: this.paginationParams,
      },
    };
  }
}

export class ListRecipesInvalidPaginationParamsResponse
  implements ListRecipesResponse
{
  private readonly paginationParams: PaginationParams;

  constructor(paginationParams: PaginationParams) {
    this.paginationParams = paginationParams;
  }

  public getResponse(): ListRecipesResponseObject {
    return {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      payload: {
        data: [],
        meta: this.paginationParams,
        message:
          "'pageSize' and 'perPage' params must be numbers greater than 0",
      },
    };
  }
}
