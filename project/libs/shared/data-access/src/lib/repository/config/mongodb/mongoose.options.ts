import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers'
import { ConfigEnvironment } from '@project/shared/core'
import { MongoConfigEnum } from './mongodb.schema';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: configService.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.USER}`),
          password: configService.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.PASSWORD}`),
          host: configService.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.HOST}`),
          port: configService.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.PORT}`),
          dbName: configService.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.DB_NAME}`),
          authDatabase: configService.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.AUTH_DATABASE}`),
        })
      };
    },
    inject: [ConfigService]
  };
}
