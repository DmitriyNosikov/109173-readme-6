import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT, RabbitMQMessage } from './rabitmq-config constant';

export const RabbitMQConfigEnum = {
  HOST: 'host',
  PORT: 'port',
  UI_PORT: 'uiPort',
  USER: 'user',
  PASSWORD: 'password',
  QUEUE: 'queue',
  EXCHANGE: 'exchange',
} as const;

export interface RabbitMQConfigInterface {
  [RabbitMQConfigEnum.HOST]: string;
  [RabbitMQConfigEnum.PORT]: number;
  [RabbitMQConfigEnum.UI_PORT]: number;
  [RabbitMQConfigEnum.USER]: string;
  [RabbitMQConfigEnum.PASSWORD]: string;
  [RabbitMQConfigEnum.QUEUE]: string;
  [RabbitMQConfigEnum.EXCHANGE]: string;
}

export class RabbitMQConfigSchema implements RabbitMQConfigInterface {
  @IsString({ message: RabbitMQMessage.ERROR.RABBITMQ_HOST_REQUIRED })
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

  @IsString({ message: RabbitMQMessage.ERROR.RABBITMQ_USER_REQUIRED })
  public user: string;

  @IsString({ message: RabbitMQMessage.ERROR.RABBITMQ_PASSWORD_REQUIRED })
  public password: string;

  @IsString()
  public queue: string;

  @IsString()
  public exchange: string;


  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(RabbitMQMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
