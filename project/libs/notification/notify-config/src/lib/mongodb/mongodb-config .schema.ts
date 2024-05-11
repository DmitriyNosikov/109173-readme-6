import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import {MongodbMessage } from './mongodb-config constant';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT } from 'libs/shared/data-access/src/lib/repository/config/mongodb/mongodb.constant';

export const MongodbConfigEnum = {
  DB_NAME: 'dbName',
  HOST: 'host',
  PORT: 'port',
  EXPRESS_PORT: 'expressPort',
  DB_USER: 'dbUser',
  DB_PASSWORD: 'dbPassword',
  AUTH_DATABASE: 'authDatabase',
} as const;

export interface MongodbConfigInterface {
  // MONGODB
  [MongodbConfigEnum.DB_NAME]: string;
  [MongodbConfigEnum.HOST]: string;
  [MongodbConfigEnum.PORT]: number;
  [MongodbConfigEnum.EXPRESS_PORT]: number;
  [MongodbConfigEnum.DB_USER]: string;
  [MongodbConfigEnum.DB_PASSWORD]: string;
  [MongodbConfigEnum.AUTH_DATABASE]: string;
}

export class MongodbConfigSchema implements MongodbConfigInterface {
  @IsString({ message: MongodbMessage.ERROR.MONGODB_DBNAME_REQUIRED })
  public dbName: string;

  @IsString({ message: MongodbMessage.ERROR.MONGODB_HOST_REQUIRED })
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
  public expressPort: number = DEFAULT_MONGODB_EXPRESS_PORT;

  @IsString({ message: MongodbMessage.ERROR.MONGODB_USER_REQUIRED })
  public dbUser: string;

  @IsString({ message: MongodbMessage.ERROR.MONGODB_PASSWORD_REQUIRED })
  public  dbPassword: string;

  @IsString({ message: MongodbMessage.ERROR.MONGODB_AUTH_DATABASE_REQUIRED })
  public authDatabase: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(MongodbMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
