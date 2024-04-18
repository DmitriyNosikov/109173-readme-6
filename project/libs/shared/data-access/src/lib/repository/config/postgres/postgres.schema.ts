import { IsNumber, IsOptional, IsString, MIN, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { PGADMIN_DEFAULT_PORT, POSTGRES_DEFAULT_PORT, PostgresConfigMessage } from './postgres.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export const PostgresConfigEnum = {
  POSTGRES_USER: 'pgUser',
  POSTGRES_PASSWORD: 'pgPassword',
  POSTGRES_DB_NAME: 'pgDbName',
  POSTGRES_PORT: 'pgPort',

  PGADMIN_DEFAULT_PORT: 'pgAdminDefaultPort',
  PGADMIN_DEFAULT_EMAIL: 'pgAdminDefaultEmail',
  PGADMIN_DEFAULT_PASSWORD: 'pgAdminDefaultPassword',
} as const;

export interface PostgresConfigInterface {
  [PostgresConfigEnum.POSTGRES_USER]: string;
  [PostgresConfigEnum.POSTGRES_PASSWORD]: string;
  [PostgresConfigEnum.POSTGRES_PORT]: number;
  [PostgresConfigEnum.PGADMIN_DEFAULT_EMAIL]: string;
  [PostgresConfigEnum.PGADMIN_DEFAULT_EMAIL]: string;
  [PostgresConfigEnum.PGADMIN_DEFAULT_PASSWORD]: string;
}

export class PostgresConfigSchema implements PostgresConfigInterface {
  @IsString({ message: PostgresConfigMessage.ERROR.POSTGRES_USER_REQUIRED })
  pgUser: string;

  @IsString({ message: PostgresConfigMessage.ERROR.POSTGRES_PASSWORD_REQUIRED })
  pgPassword: string;

  @IsString({ message: PostgresConfigMessage.ERROR.POSTGRES_DBNAME_REQUIRED })
  pgDbName: string;


  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  pgPort: number = POSTGRES_DEFAULT_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  pgAdminDefaultPort: number = PGADMIN_DEFAULT_PORT;

  @IsString({ message: PostgresConfigMessage.ERROR.PGADMIN_DEFAULT_EMAIL_REQUIRED })
  pgAdminDefaultEmail: string;

  @IsString({ message: PostgresConfigMessage.ERROR.PGADMIN_DEFAULT_PASSWORD_REQUIRED })
  pgAdminDefaultPassword: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(PostgresConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
