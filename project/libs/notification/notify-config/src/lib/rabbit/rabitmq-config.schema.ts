import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT, NotifyMessage } from './rabitmq-config constant';

export const RabbitmqConfigEnum = {
  RABBITMQ_HOST: 'host',
  RABBITMQ_PORT: 'port',
  RABBITMQ_UI_PORT: 'uiPort',
  RABBITMQ_USER: 'user',
  RABBITMQ_PASSWORD: 'password',
  RABBITMQ_QUEUE: 'queue',
  RABBITMQ_EXCHANGE: 'exchange',
} as const;

export interface RabbitmqConfigInterface {
  [RabbitmqConfigEnum.RABBITMQ_HOST]: string;
  [RabbitmqConfigEnum.RABBITMQ_PORT]: number;
  [RabbitmqConfigEnum.RABBITMQ_UI_PORT]: number;
  [RabbitmqConfigEnum.RABBITMQ_USER]: string;
  [RabbitmqConfigEnum.RABBITMQ_PASSWORD]: string;
  [RabbitmqConfigEnum.RABBITMQ_QUEUE]: string;
  [RabbitmqConfigEnum.RABBITMQ_EXCHANGE]: string;
}

export class RabbitmqConfigSchema implements RabbitmqConfigInterface {
  @IsString({ message: NotifyMessage.ERROR.RABBITMQ_HOST_REQUIRED })
  public host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public port: number = DEFAULT_RAMMITMQ_PORT;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public uiPort: number = DEFAULT_RABBITMQ_UI_PORT;

  @IsString({ message: NotifyMessage.ERROR.RABBITMQ_USER_REQUIRED })
  public user: string;

  @IsString({ message: NotifyMessage.ERROR.RABBITMQ_PASSWORD_REQUIRED })
  public password: string;

  @IsString()
  public queue: string;

  @IsString()
  public exchange: string;


  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(NotifyMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
