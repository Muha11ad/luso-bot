import { MyContext } from '@/bot/types';

export function getLanguageMessage(ctx: MyContext): string {
  return `
  <strong>${ctx.t('choose_language')} :</strong>
  `;
}
