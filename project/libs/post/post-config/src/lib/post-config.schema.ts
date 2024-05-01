import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';
import { DEFAULT_PORT, PostConfigMessage } from './post-config.constant';

export const PostConfigEnum = {
  HOST: 'host',
  PORT: 'port',
} as const;

export interface PostConfigInterface {
  [PostConfigEnum.HOST]: string;
  [PostConfigEnum.PORT]: number;
}
export class PostConfigSchema implements PostConfigInterface {
  @IsString({ message: PostConfigMessage.ERROR.POST_APP_HOST_REQUIRED })
  host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = DEFAULT_PORT;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(PostConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
