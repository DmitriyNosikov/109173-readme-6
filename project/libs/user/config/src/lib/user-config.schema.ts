import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { DEFAULT_PORT, UserConfigMessage } from './user-config.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export interface UserConfigInterface {
  host: string;
  port: number;
}

export class UserConfigSchema implements UserConfigInterface {
  @IsString({ message: UserConfigMessage.ERROR.USER_APP_HOST_REQUIRED })
  host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = DEFAULT_PORT;

  async validate() {
    return await validateOrReject(this);
  }
}
