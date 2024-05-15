import { HttpModuleAsyncOptions } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config';

export function getHttpOptions(optionSpace?: string): HttpModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => ({
      timeout: config.get<number>(`${optionSpace}.httpClientMaxTimeout`),
      maxRedirects: config.get<number>(`${optionSpace}.httpClientMaxRedirects`),
    }),
    inject: [ConfigService]
  }
}
