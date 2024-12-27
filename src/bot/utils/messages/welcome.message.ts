import { MyContext } from '@/bot/types';

export function getWelcomeMessage(ctx: MyContext) {
  return `
*${ctx.t('welcome_message')}*
- ${ctx.t('welcome_second_message')}
- ${ctx.t('welcome_third_message')}
- ${ctx.t('welcome_fourth_message')}
    `;
}
