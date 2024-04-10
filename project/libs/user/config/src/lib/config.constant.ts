export const USERS_ENV_FILE_PATH = 'apps/user/user.env'
export const DEFAULT_PORT = 8000;
export const DEFAULT_MONGODB_PORT = 27017;

export const Environment = {
  DEV: 'development',
  PROD: 'production',
  STAGE: 'stage'
} as const;
export type EnvironmentType = typeof Environment[keyof typeof Environment];

export const ConfigEnvironment = {
  APP: 'application',
  DB: 'database'
} as const;
