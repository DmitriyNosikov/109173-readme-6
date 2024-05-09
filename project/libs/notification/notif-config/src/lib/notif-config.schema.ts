import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT, NotifMessage } from './notif-config constant';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT } from 'libs/shared/data-access/src/lib/repository/config/mongodb/mongodb.constant';

export const NotifConfigEnum = {
  // MONGODB
  DB_NAME: 'dbName',
  DB_HOST: 'dbHost',
  DB_PORT: 'dbPort',
  EXPRESS_PORT: 'expressPort',
  DB_USER: 'dbUser',
  DB_PASSWORD: 'dbPassword',
  AUTH_DATABASE: 'authDatabase',

  // RABBITMQ
  RABBITMQ_HOST: 'rabbitmqHost',
  RABBITMQ_PORT: 'rabbitmqPort',
  RABBITMQ_UI_PORT: 'rabbitmqUiPort',
  RABBITMQ_USER: 'rabbitmqUser',
  RABBITMQ_PASSWORD: 'rabbitmqPassword',
  RABBITMQ_QUEUE: 'rabbitmqQueue',
  RABBITMQ_EXCHANGE: 'rabbitmqExchange',
} as const;

export interface NotifConfigInterface {
  // MONGODB
  [NotifConfigEnum.DB_NAME]: string;
  [NotifConfigEnum.DB_HOST]: string;
  [NotifConfigEnum.DB_PORT]: number;
  [NotifConfigEnum.EXPRESS_PORT]: number;
  [NotifConfigEnum.DB_USER]: string;
  [NotifConfigEnum.DB_PASSWORD]: string;
  [NotifConfigEnum.AUTH_DATABASE]: string;

  // RABBITMQ
  [NotifConfigEnum.RABBITMQ_HOST]: string;
  [NotifConfigEnum.RABBITMQ_PORT]: number;
  [NotifConfigEnum.RABBITMQ_UI_PORT]: number;
  [NotifConfigEnum.RABBITMQ_USER]: string;
  [NotifConfigEnum.RABBITMQ_PASSWORD]: string;
  [NotifConfigEnum.RABBITMQ_QUEUE]: string;
  [NotifConfigEnum.RABBITMQ_EXCHANGE]: string;
}

export class NotifConfigSchema implements NotifConfigInterface {
  // MONGODB
  @IsString({ message: NotifMessage.ERROR.MONGODB_DBNAME_REQUIRED })
  public dbName: string;

  @IsString({ message: NotifMessage.ERROR.MONGODB_HOST_REQUIRED })
  public dbHost: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public dbPort: number = DEFAULT_MONGODB_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public expressPort: number = DEFAULT_MONGODB_EXPRESS_PORT;

  @IsString({ message: NotifMessage.ERROR.MONGODB_USER_REQUIRED })
  public dbUser: string;

  @IsString({ message: NotifMessage.ERROR.MONGODB_PASSWORD_REQUIRED })
  public  dbPassword: string;

  @IsString({ message: NotifMessage.ERROR.MONGODB_AUTH_DATABASE_REQUIRED })
  public authDatabase: string;

  // RABBITMQ
  @IsString({ message: NotifMessage.ERROR.RABBITMQ_HOST_REQUIRED })
  public rabbitmqHost: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public rabbitmqPort: number = DEFAULT_RAMMITMQ_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public rabbitmqUiPort: number = DEFAULT_RABBITMQ_UI_PORT;

  @IsString({ message: NotifMessage.ERROR.RABBITMQ_USER_REQUIRED })
  public rabbitmqUser: string;

  @IsString({ message: NotifMessage.ERROR.RABBITMQ_PASSWORD_REQUIRED })
  public rabbitmqPassword: string;

  @IsString()
  public rabbitmqQueue: string;

  @IsString()
  public rabbitmqExchange: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(NotifMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
