import { HttpStatus } from '@nestjs/common';
import {
  AddNewRecipeResponse,
  AddNewRecipeResponseObject,
} from './addNewRecipe.interfaces';

export class AddNewRecipeSuccessResponse implements AddNewRecipeResponse {
  public getResponse(): AddNewRecipeResponseObject {
    return {
      status: HttpStatus.CREATED,
      payload: {
        message: 'Success',
      },
    };
  }
}

export class AddNewRecipeInvalidPayloadResponse
  implements AddNewRecipeResponse
{
  public getResponse(): AddNewRecipeResponseObject {
    return {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      payload: {
        message: 'Invalid payload',
      },
    };
  }
}
