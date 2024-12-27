import { session } from 'grammy';
import { i18n } from './i18n.config';

export const botConfigProvider = {
  provide: 'BOT_CONFIG',
  useFactory: () => {
    return {
      sessionMiddleware: session({
        initial: () => {
          return {};
        },
      }),
      i18nMiddleware: i18n.middleware(),
    };
  },
};
