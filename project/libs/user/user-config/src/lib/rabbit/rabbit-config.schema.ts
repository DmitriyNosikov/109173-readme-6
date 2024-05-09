import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT, RabbitMessage } from './rabbit-config constant';

export const RabbitConfigEnum = {
  RABBITMQ_HOST: 'rabbitmqHost',
  RABBITMQ_PORT: 'rabbitmqPort',
  RABBITMQ_UI_PORT: 'rabbitmqUiPort',
  RABBITMQ_USER: 'rabbitmqUser',
  RABBITMQ_PASSWORD: 'rabbitmqPassword',
  RABBITMQ_QUEUE: 'rabbitmqQueue',
  RABBITMQ_EXCHANGE: 'rabbitmqExchange',
} as const;

export interface RabbitConfigInterface {
  [RabbitConfigEnum.RABBITMQ_HOST]: string;
  [RabbitConfigEnum.RABBITMQ_PORT]: number;
  [RabbitConfigEnum.RABBITMQ_UI_PORT]: number;
  [RabbitConfigEnum.RABBITMQ_USER]: string;
  [RabbitConfigEnum.RABBITMQ_PASSWORD]: string;
  [RabbitConfigEnum.RABBITMQ_QUEUE]: string;
  [RabbitConfigEnum.RABBITMQ_EXCHANGE]: string;
}

export class RabbitConfigSchema implements RabbitConfigInterface {
  // RABBITMQ
  @IsString({ message: RabbitMessage.ERROR.RABBITMQ_HOST_REQUIRED })
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

  @IsString({ message: RabbitMessage.ERROR.RABBITMQ_USER_REQUIRED })
  public rabbitmqUser: string;

  @IsString({ message: RabbitMessage.ERROR.RABBITMQ_PASSWORD_REQUIRED })
  public rabbitmqPassword: string;

  @IsString()
  public rabbitmqQueue: string;

  @IsString()
  public rabbitmqExchange: string;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(RabbitMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
