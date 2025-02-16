import { Injectable } from '@nestjs/common';
import { MyContext } from '@/shared/utils/types';
import { ICallback } from '../callback.interface';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class StartLanguageCallback implements ICallback {

  public async handle(ctx: MyContext): Promise<void> {

    try {

      const callbackQuery = ctx.callbackQuery;
      const language = callbackQuery.data.split('_')[1];

      ctx.i18n.setLocale(language);
      await ctx.answerCallbackQuery(`Language set to ${language}`);
      await deletePrevMessage(ctx);

      await ctx.reply(this.getWelcomeMessage(ctx), {
        parse_mode: 'Markdown',
      });

    } catch (error) {

      return handleBotError(error, 'start', ctx);

    }

  }

  private getWelcomeMessage(ctx: MyContext) {

    return `
  **${ctx.t('welcome_message')}**
  
  ${ctx.t('welcome_second_message')}
  
  ${ctx.t('welcome_third_message')}
  
  ${ctx.t('welcome_fourth_message')}
    `;

  }

}
