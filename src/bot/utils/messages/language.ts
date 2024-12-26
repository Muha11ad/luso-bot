import { MyContext } from '@/bot/types';

export function getLanguageMessage(ctx: MyContext): string {
  const choose_language = ctx.t('choose_language');
  return `
  <strong>${choose_language} :</strong>
  `;
}
