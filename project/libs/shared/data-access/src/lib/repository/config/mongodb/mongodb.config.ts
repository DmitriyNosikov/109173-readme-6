import { IsPort, IsString, Max, Min, validateOrReject } from 'class-validator';
import { DEFAULT_MONGODB_PORT, MAX_PORT, MIN_PORT, MongoMessage } from './mongodb.constant';

export class MongoConfig {
  @IsString({ message: MongoMessage.ERROR.MONGODB_NAME_REQUIRED })
  public name: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_HOST_REQUIRED })
  public host: string;

  @IsPort()
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number = DEFAULT_MONGODB_PORT;

  @IsString({ message: MongoMessage.ERROR.MONGODB_USER_REQUIRED })
  public user: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_PASSWORD })
  public  password: string;

  @IsString({ message: MongoMessage.ERROR.MONGODB_AUTH_BASE_REQUIRED })
  public authBase: string;

  public validate() {
    return validateOrReject(this);
  }
}
