import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace?: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.rabbitmqExchange`),
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
