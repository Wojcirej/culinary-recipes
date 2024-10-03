export interface AddNewRecipeResponse {
  getResponse(): AddNewRecipeResponseObject;
}

export interface AddNewRecipeResponseObject {
  status: number;
  payload: {
    message: string;
  };
}
