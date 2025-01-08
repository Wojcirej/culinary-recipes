export interface ListRecipesResponse {
  getResponse(): ListRecipesResponseObject;
}

export interface ListRecipesResponseObject {
  status: number;
  payload: {
    data?: Array<any>;
    meta: PaginationParams;
    message?: string;
  };
}

export interface PaginationParams {
  pageSize: number;
  page: number;
}
