import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import {MongoDBMessage } from './mongodb-config.constant';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT } from 'libs/shared/data-access/src/lib/repository/config/mongodb/mongodb.constant';

export const MongoDBConfigEnum = {
  DB_NAME: 'dbName',
  HOST: 'host',
  PORT: 'port',
  EXPRESS_PORT: 'expressPort',
  USER: 'user',
  PASSWORD: 'password',
  AUTH_DATABASE: 'authDatabase',
} as const;

export interface MongoDBConfigInterface {
  [MongoDBConfigEnum.DB_NAME]: string;
  [MongoDBConfigEnum.HOST]: string;
  [MongoDBConfigEnum.PORT]: number;
  [MongoDBConfigEnum.EXPRESS_PORT]: number;
  [MongoDBConfigEnum.USER]: string;
  [MongoDBConfigEnum.PASSWORD]: string;
  [MongoDBConfigEnum.AUTH_DATABASE]: string;
}

export class MongoDBConfigSchema implements MongoDBConfigInterface {
  @IsString({ message: MongoDBMessage.ERROR.MONGODB_DBNAME_REQUIRED })
  public dbName: string;

  @IsString({ message: MongoDBMessage.ERROR.MONGODB_HOST_REQUIRED })
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

  @IsString({ message: MongoDBMessage.ERROR.MONGODB_USER_REQUIRED })
  public user: string;

  @IsString({ message: MongoDBMessage.ERROR.MONGODB_PASSWORD_REQUIRED })
  public  password: string;

  @IsString({ message: MongoDBMessage.ERROR.MONGODB_AUTH_DATABASE_REQUIRED })
  public authDatabase: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(MongoDBMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
