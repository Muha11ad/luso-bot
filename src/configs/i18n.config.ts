import { resolve } from 'path';
import { I18n } from '@grammyjs/i18n';
import { MyContext } from '@/shared/utils/types';

const filePath = resolve(process.cwd(), 'locales');

export const i18n = new I18n<MyContext>({
  defaultLocale: 'ru',
  useSession: true,
  directory: filePath,
});
