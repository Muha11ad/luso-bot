import { session } from 'grammy';
import { i18n } from './i18n.config';
import { SessionData } from '@/bot/types';

export const botConfigProvider = {
  provide: 'BOT_CONFIG',
  useFactory: () => {
    return {
      sessionMiddleware: session({
        initial: (): SessionData => ({
          rec: {},
          step: '',
          __language_code: undefined,
        }),
      }),
      i18nMiddleware: i18n.middleware(),
    };
  },
};
