import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers'

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          host: configService.get<string>(`${optionSpace}.host`),
          port: configService.get<string>(`${optionSpace}.port`),
          dbName: configService.get<string>(`${optionSpace}.dbName`),
          username: configService.get<string>(`${optionSpace}.user`),
          password: configService.get<string>(`${optionSpace}.password`),
          authDatabase: configService.get<string>(`${optionSpace}.authDatabase`),
        })
      };
    },
    inject: [ConfigService]
  };
}
