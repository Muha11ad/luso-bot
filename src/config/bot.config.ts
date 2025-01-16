import { session, MiddlewareFn } from 'grammy';
import { i18n } from './i18n.config';
import { SessionData } from '@/bot/types';

export const botConfigProvider = {
  provide: 'BOT_CONFIG',
  useFactory: () => {
    const sessionMiddleware = session({
      initial: (): SessionData => ({
        rec: {},
        step: '',
        __language_code: undefined,
      }),
    }) as MiddlewareFn<any>;

    const i18nMiddleware = i18n.middleware() as MiddlewareFn<any>;

    return {
      sessionMiddleware,
      i18nMiddleware,
    };
  },
};
