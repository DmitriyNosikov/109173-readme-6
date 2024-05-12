import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { PGADMIN_DEFAULT_PORT, POSTGRES_DEFAULT_PORT, PostgresConfigMessage } from './postgres-config.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export const PostgresConfigEnum = {
  PORT: 'port',
  DB_NAME: 'dbName',
  USER: 'user',
  PASSWORD: 'password',

  PGADMIN_PORT: 'pgAdminPort',
  PGADMIN_EMAIL: 'pgAdminEmail',
  PGADMIN_PASSWORD: 'pgAdminPassword',
} as const;

export interface PostgresConfigInterface {
  [PostgresConfigEnum.PORT]: number;
  [PostgresConfigEnum.DB_NAME]: string;
  [PostgresConfigEnum.USER]: string;
  [PostgresConfigEnum.PASSWORD]: string;

  [PostgresConfigEnum.PGADMIN_PORT]: number;
  [PostgresConfigEnum.PGADMIN_EMAIL]: string;
  [PostgresConfigEnum.PGADMIN_PASSWORD]: string;
}

export class PostgresConfigSchema implements PostgresConfigInterface {
  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = POSTGRES_DEFAULT_PORT;

  @IsString({ message: PostgresConfigMessage.ERROR.POSTGRES_DBNAME_REQUIRED })
  dbName: string;

  @IsString({ message: PostgresConfigMessage.ERROR.POSTGRES_USER_REQUIRED })
  user: string;

  @IsString({ message: PostgresConfigMessage.ERROR.POSTGRES_PASSWORD_REQUIRED })
  password: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  pgAdminPort: number = PGADMIN_DEFAULT_PORT;

  @IsString({ message: PostgresConfigMessage.ERROR.PGADMIN_DEFAULT_EMAIL_REQUIRED })
  pgAdminEmail: string;

  @IsString({ message: PostgresConfigMessage.ERROR.PGADMIN_DEFAULT_PASSWORD_REQUIRED })
  pgAdminPassword: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(PostgresConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
