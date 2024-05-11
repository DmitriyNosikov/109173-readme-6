import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { DEFAULT_MONGODB_PORT, DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_PORT, UserConfigMessage } from './user-config.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export const UserConfigEnum = {
  HOST: 'host',
  PORT: 'port',
} as const;

export interface UserConfigInterface {
  [UserConfigEnum.HOST]: string;
  [UserConfigEnum.PORT]: number;
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
    return await validateOrReject(this).catch(errors => {
      console.log(UserConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
