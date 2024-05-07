export const MIN_PORT = 0
export const MAX_PORT = 65535

export const Environment = {
  DEV: 'development',
  PROD: 'production',
  STAGE: 'stage'
} as const;

export type EnvironmentType = typeof Environment[keyof typeof Environment];

export const ConfigEnvironment = {
  USER: 'user',
  POST: 'post',
  DB: 'database',
  JWT: 'jwt'
} as const;
