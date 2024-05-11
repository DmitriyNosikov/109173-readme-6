import { IsEmail, IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_PORT, DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT, DEFAULT_SMTP_FROM, DEFAULT_SMTP_PORT, NotifyMessage } from './notify-config constant';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT } from 'libs/shared/data-access/src/lib/repository/config/mongodb/mongodb.constant';

export const NotifyConfigEnum = {
  // SERVER
  HOST: 'host',
  PORT: 'port',

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

  // SMTP
  SMTP_HOST: 'smtpHost',
  SMTP_PORT: 'smtpPort',
  SMTP_USER: 'smtpUser',
  SMTP_PASSWORD: 'smtpPassword',
  SMTP_FROM: 'smtpFrom',
} as const;

export interface NotifyConfigInterface {
  // SERVER
  [NotifyConfigEnum.HOST]: string;
  [NotifyConfigEnum.PORT]: number;

  // MONGODB
  [NotifyConfigEnum.DB_NAME]: string;
  [NotifyConfigEnum.DB_HOST]: string;
  [NotifyConfigEnum.DB_PORT]: number;
  [NotifyConfigEnum.EXPRESS_PORT]: number;
  [NotifyConfigEnum.DB_USER]: string;
  [NotifyConfigEnum.DB_PASSWORD]: string;
  [NotifyConfigEnum.AUTH_DATABASE]: string;

  // RABBITMQ
  [NotifyConfigEnum.RABBITMQ_HOST]: string;
  [NotifyConfigEnum.RABBITMQ_PORT]: number;
  [NotifyConfigEnum.RABBITMQ_UI_PORT]: number;
  [NotifyConfigEnum.RABBITMQ_USER]: string;
  [NotifyConfigEnum.RABBITMQ_PASSWORD]: string;
  [NotifyConfigEnum.RABBITMQ_QUEUE]: string;
  [NotifyConfigEnum.RABBITMQ_EXCHANGE]: string;

  // SMTP
  [NotifyConfigEnum.SMTP_HOST]: string;
  [NotifyConfigEnum.SMTP_PORT]: number;
  [NotifyConfigEnum.SMTP_USER]: string;
  [NotifyConfigEnum.SMTP_PASSWORD]: string;
  [NotifyConfigEnum.SMTP_FROM]: string;
}

export class NotifyConfigSchema implements NotifyConfigInterface {
  // SERVER
  @IsString({ message: NotifyMessage.ERROR.NOTIFY_APP_HOST_REQUIRED })
  host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = DEFAULT_PORT;

  // MONGODB
  @IsString({ message: NotifyMessage.ERROR.MONGODB_DBNAME_REQUIRED })
  public dbName: string;

  @IsString({ message: NotifyMessage.ERROR.MONGODB_HOST_REQUIRED })
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

  @IsString({ message: NotifyMessage.ERROR.MONGODB_USER_REQUIRED })
  public dbUser: string;

  @IsString({ message: NotifyMessage.ERROR.MONGODB_PASSWORD_REQUIRED })
  public  dbPassword: string;

  @IsString({ message: NotifyMessage.ERROR.MONGODB_AUTH_DATABASE_REQUIRED })
  public authDatabase: string;

  // RABBITMQ
  @IsString({ message: NotifyMessage.ERROR.RABBITMQ_HOST_REQUIRED })
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

  @IsString({ message: NotifyMessage.ERROR.RABBITMQ_USER_REQUIRED })
  public rabbitmqUser: string;

  @IsString({ message: NotifyMessage.ERROR.RABBITMQ_PASSWORD_REQUIRED })
  public rabbitmqPassword: string;

  @IsString()
  public rabbitmqQueue: string;

  @IsString()
  public rabbitmqExchange: string;

  // SMTP
  @IsString({ message: NotifyMessage.ERROR.SMTP_HOST_REQUIRED })
  public smtpHost: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public smtpPort: number = DEFAULT_SMTP_PORT;

  @IsString({ message: NotifyMessage.ERROR.SMTP_USER_REQUIRED })
  public smtpUser: string;

  @IsString({ message: NotifyMessage.ERROR.SMTP_PASSWORD_REQUIRED })
  public smtpPassword: string;

  @IsEmail()
  @IsString()
  public smtpFrom: string = DEFAULT_SMTP_FROM;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(NotifyMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
