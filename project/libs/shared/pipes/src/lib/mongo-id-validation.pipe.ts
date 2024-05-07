import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose';
import { MessagesType } from '@project/shared/core';

const MongoMessage: MessagesType = {
  ERROR: {
    INCORRECT_ID: 'Incorrect MongoID'
  }
}

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, metadata: ArgumentMetadata) {
    if(metadata.type !== 'param') {
      throw new Error('Mongo ID Validation pipe can be used only with params!');
    }

    if(!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${MongoMessage.ERROR.INCORRECT_ID}: ${value}`);
    }

    return value;
  }
}
