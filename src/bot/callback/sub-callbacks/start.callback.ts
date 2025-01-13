import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ICallback } from '../callback.interface';
import { deletePrevMessage } from '@/bot/utils/helpers';

@Injectable()
export class StartLanguageCallback implements ICallback {
  private getWelcomeMessage(ctx: MyContext) {
    return `
  **${ctx.t('welcome_message')}**
  
  ${ctx.t('welcome_second_message')}
  
  ${ctx.t('welcome_third_message')}
  
  ${ctx.t('welcome_fourth_message')}
    `;
  }

  async handle(ctx: MyContext): Promise<void> {
    const callbackQuery = ctx.callbackQuery;
    const language = callbackQuery.data.split('_')[1];

    ctx.i18n.setLocale(language);
    await ctx.answerCallbackQuery(`Language set to ${language}`);
    deletePrevMessage(ctx);

    await ctx.reply(this.getWelcomeMessage(ctx), {
      parse_mode: 'Markdown',
    });
  }
}
