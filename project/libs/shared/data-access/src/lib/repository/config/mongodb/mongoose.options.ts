import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers'
import { ConfigEnvironment } from '@project/shared/core'
import { MongoConfigEnum } from './mongodb.schema';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.USER}`),
          password: config.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.PASSWORD}`),
          host: config.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.HOST}`),
          port: config.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.PORT}`),
          dbName: config.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.DB_NAME}`),
          authDatabase: config.get<string>(`${ConfigEnvironment.DB}.${MongoConfigEnum.AUTH_DATABASE}`),
        })
      };
    },
    inject: [ConfigService]
  };
}
