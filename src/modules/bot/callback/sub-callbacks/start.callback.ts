import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyContext } from '@/shared/utils/types';
import { ICallback } from '../callback.interface';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class StartLanguageCallback implements ICallback {

  constructor(private readonly configService: ConfigService){}

  public async handle(ctx: MyContext): Promise<void> {

    try {

      const callbackQuery = ctx.callbackQuery;
      const language = callbackQuery.data.split('_')[1];

      ctx.i18n.setLocale(language);
      await ctx.answerCallbackQuery(`Language set to ${language}`);
      await deletePrevMessage(ctx);

      const webAppUrl = this.configService.get<string>('tg.webApp');

      await ctx.reply(this.getWelcomeMessage(ctx), {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: ctx.t('open_mini_app'),
                url: webAppUrl,
              },
            ],
          ],
        },
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
