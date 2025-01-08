import { PaginationParams } from './listRecipes/listRecipes.interfaces';

export interface Command {
  isValid(): boolean;
  isInvalid(): boolean;
}

export abstract class PaginatedQuery {
  private readonly pageSize: number;
  private readonly page: number;

  constructor(params) {
    this.pageSize = parseInt(params.pageSize) || 25;
    this.page = parseInt(params.page) || 1;
  }

  isValid(): boolean {
    return !this.isInvalid();
  }

  isInvalid(): boolean {
    return this.pageSize > 0 && this.page > 0;
  }

  serializePaginationParams(): PaginationParams {
    return {
      pageSize: this.pageSize,
      page: this.page,
    };
  }
}
