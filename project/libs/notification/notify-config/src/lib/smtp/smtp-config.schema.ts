import { IsEmail, IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { SmtpMessage } from './smtp-config constant';
import { DEFAULT_SMTP_FROM, DEFAULT_SMTP_PORT } from '../notify-config constant';


export const SmtpConfigEnum = {
  // SMTP
  HOST: 'host',
  PORT: 'port',
  USER: 'user',
  PASSWORD: 'password',
  FROM: 'from',
} as const;

export interface SmtpConfigInterface {
  [SmtpConfigEnum.HOST]: string;
  [SmtpConfigEnum.PORT]: number;
  [SmtpConfigEnum.USER]: string;
  [SmtpConfigEnum.PASSWORD]: string;
  [SmtpConfigEnum.FROM]: string;
}

export class SmtpConfigSchema implements SmtpConfigInterface {
  // SMTP
  @IsString({ message: SmtpMessage.ERROR.SMTP_HOST_REQUIRED })
  public host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  public port: number = DEFAULT_SMTP_PORT;

  @IsString({ message: SmtpMessage.ERROR.SMTP_USER_REQUIRED })
  public user: string;

  @IsString({ message: SmtpMessage.ERROR.SMTP_PASSWORD_REQUIRED })
  public password: string;

  @IsEmail()
  @IsString()
  public from: string = DEFAULT_SMTP_FROM;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(SmtpMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
