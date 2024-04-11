import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { DEFAULT_MONGODB_PORT, MongoMessage } from './mongodb.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export interface MongoConfigInterface {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export class MongoConfigSchema implements MongoConfigInterface {
  @IsString({ message: MongoMessage.ERROR.MONGODB_NAME_REQUIRED })
  public name: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_HOST_REQUIRED })
  public host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGODB_PORT;

  @IsString({ message: MongoMessage.ERROR.MONGODB_USER_REQUIRED })
  public user: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_PASSWORD })
  public  password: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_AUTH_BASE_REQUIRED })
  public authBase: string;

  async validate() {
    return await validateOrReject(this);
  }
}
