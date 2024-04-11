import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { DEFAULT_DB_PORT, DEFAULT_DB_UI_PORT, DEFAULT_PORT, UserConfigMessage } from './user-config.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export interface UserConfigInterface {
  host: string;
  port: number;
  db_port: number;
  db_ui_port: number;
}

export class UserConfigSchema implements UserConfigInterface {
  @IsString({ message: UserConfigMessage.ERROR.USER_APP_HOST_REQUIRED })
  host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = DEFAULT_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  db_port: number = DEFAULT_DB_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  db_ui_port: number = DEFAULT_DB_UI_PORT;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(UserConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
