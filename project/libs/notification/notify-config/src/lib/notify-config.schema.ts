import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_PORT, NotifyMessage } from './notify-config constant';

export const NotifyConfigEnum = {
  // SERVER
  HOST: 'host',
  PORT: 'port',
} as const;

export interface NotifyConfigInterface {
  // SERVER
  [NotifyConfigEnum.HOST]: string;
  [NotifyConfigEnum.PORT]: number;
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

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(NotifyMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
