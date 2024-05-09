import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers'
import { ConfigEnvironment } from '@project/shared/core'
import { NotifyConfigEnum } from './notify-config.schema';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: configService.get<string>(`${ConfigEnvironment.NOTIF}.${NotifyConfigEnum.DB_USER}`),
          password: configService.get<string>(`${ConfigEnvironment.NOTIF}.${NotifyConfigEnum.DB_PASSWORD}`),
          host: configService.get<string>(`${ConfigEnvironment.NOTIF}.${NotifyConfigEnum.DB_HOST}`),
          port: configService.get<string>(`${ConfigEnvironment.NOTIF}.${NotifyConfigEnum.DB_PORT}`),
          dbName: configService.get<string>(`${ConfigEnvironment.NOTIF}.${NotifyConfigEnum.DB_NAME}`),
          authDatabase: configService.get<string>(`${ConfigEnvironment.NOTIF}.${NotifyConfigEnum.AUTH_DATABASE}`),
        })
      };
    },
    inject: [ConfigService]
  };
}
