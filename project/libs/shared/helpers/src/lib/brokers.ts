import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace?: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.exchange`),
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        port: config.get<string>(`${optionSpace}.port`),
        username: config.get<string>(`${optionSpace}.user`),
        password: config.get<string>(`${optionSpace}.password`),
      }),
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
