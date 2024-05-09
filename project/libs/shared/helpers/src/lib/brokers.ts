import { ConfigService } from '@nestjs/config';
import { ConfigEnvironment } from '@project/shared/core'
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace) {
  optionSpace = optionSpace ?? ConfigEnvironment.NOTIF;

  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.queue`),
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.rabbitmqHost`),
        password: config.get<string>(`${optionSpace}.rabbitmqPassword`),
        username: config.get<string>(`${optionSpace}.rabbitmqUser`),
        port: config.get<string>(`${optionSpace}.rabbitmqPort`),
      }),
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
