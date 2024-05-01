import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { DEFAULT_MONGODB_PORT, MongoMessage } from './mongodb.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export const MongoConfigEnum = {
  DB_NAME: 'dbName',
  HOST: 'host',
  PORT: 'port',
  EXPRESS_PORT: 'expressPort',
  USER: 'user',
  PASSWORD: 'password',
  AUTH_DATABASE: 'authDatabase',
} as const;

export interface MongoConfigInterface {
  [MongoConfigEnum.DB_NAME]: string;
  [MongoConfigEnum.HOST]: string;
  [MongoConfigEnum.PORT]: number;
  [MongoConfigEnum.EXPRESS_PORT]: number;
  [MongoConfigEnum.USER]: string;
  [MongoConfigEnum.PASSWORD]: string;
  [MongoConfigEnum.AUTH_DATABASE]: string;
}

export class MongoConfigSchema implements MongoConfigInterface {
  @IsString({ message: MongoMessage.ERROR.MONGODB_NAME_REQUIRED })
  public dbName: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_HOST_REQUIRED })
  public host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGODB_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public expressPort: number = DEFAULT_MONGODB_PORT;

  @IsString({ message: MongoMessage.ERROR.MONGODB_USER_REQUIRED })
  public user: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_PASSWORD })
  public  password: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_AUTH_DATABASE_REQUIRED })
  public authDatabase: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(MongoMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
