import dotenv from 'dotenv';
dotenv.config();

export type AppConfig = {
  environment: 'PROD' | 'DEV';
  environmentVariables: string[];
  redirectUri: string;
  scopes: string[];
  port: number;
  prefix?: string;
  overlay: {
    scenes: string[];
    startingScene: AppConfig['overlay']['scenes'][number];
    timerLength: number;
  };
};

export const AppConfig: AppConfig = {
  // TODO: Convert into branded type
  environment: determineRuntimeEnvironment(),
  environmentVariables: [],
  // environmentVariables: ['CLIENT_ID', 'CLIENT_SECRET', 'TWITCH_CHANNELS', "TWITCH_CHANNELS_ID"],
  redirectUri: determineRuntimeEnvironment() === 'PROD' ? 'https://overlay.tklein.it' : 'http://localhost',
  scopes: [
    'channel:manage:broadcast',
    'channel:manage:polls',
    'channel:manage:predictions',
    'channel:manage:redemptions',
    'channel:moderate',
    'channel:read:goals',
    'channel:read:hype_train',
    'channel:read:polls',
    'channel:read:predictions',
    'channel:read:redemptions',
    'channel:read:subscriptions',
    'channel:read:vips',
    'chat:edit',
    'chat:read',
    'moderation:read',
    'moderator:manage:announcements',
    'moderator:manage:banned_users',
    'moderator:manage:chat_messages',
    'moderator:read:chat_settings',
    'moderator:read:chatters',
    'moderator:read:followers',
    'moderator:read:shoutouts',
  ],
  port: determineRuntimeEnvironment() === 'PROD' ? 8090 : 80,
  prefix: '!',
  overlay: {
    timerLength: 5000,
    scenes: ['start', 'dev', 'chat', 'pause', 'end'],
    startingScene: 'start',
  },
};

export function determineRuntimeEnvironment(): AppConfig['environment'] {
  const env = process.env.ENV;
  if (!env) return 'DEV';
  if (env.toUpperCase() === 'PROD') return 'PROD';
  return 'DEV';
}
