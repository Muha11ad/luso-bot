import { MyContext } from '@/bot/types';
import { InlineKeyboard } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { deletePrevMessage } from '@/bot/utils/helpers';
import { AGES_WITH_CALLBACK } from '@/bot/utils/consts';

@Injectable()
export class RecommendationCommand implements ICommand {
  private getRecommendationMessage(ctx: MyContext) {
    return `
  *${ctx.t('recommendation_message')}* \n*${ctx.t('recommendation_second_message')}* \n*${ctx.t('recommendation_third_message')}* \n${ctx.t('select_age')}
  
    `;
  }
  private getAgeKeyboard() {
    const keyboard = new InlineKeyboard();
    AGES_WITH_CALLBACK.forEach((value) => {
      keyboard.text(value.text, value.callback_data);
    });
    return keyboard;
  }
  async execute(ctx: MyContext): Promise<void> {
    try {
      await deletePrevMessage(ctx);
      await ctx.reply(this.getRecommendationMessage(ctx), {
        parse_mode: 'Markdown',
        reply_markup: this.getAgeKeyboard(),
      });
    } catch (error) {
      console.log(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    }
  }
}
