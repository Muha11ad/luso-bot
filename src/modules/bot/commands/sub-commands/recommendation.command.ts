import { InlineKeyboard } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { MyContext } from '@/shared/utils/types';
import { AGES_WITH_CALLBACK, COMMANDS } from '@/shared/utils/consts';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class RecommendationCommand implements ICommand {

  public async execute(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);

      // await ctx.reply(ctx.t('rec_error'))

      await ctx.reply(this.getRecommendationMessage(ctx), {
        parse_mode: 'Markdown',
        reply_markup: this.getAgeKeyboard(),
      });

    } catch (error) {

      return handleBotError(error, COMMANDS.RECOMMENDATION, ctx);

    }
  }

  private getRecommendationMessage(ctx: MyContext) {

    return `
  *${ctx.t('recommendation_message')}* \n*${ctx.t('recommendation_second_message')}* \n${ctx.t('select_age')}
  
    `;

  }

  private getAgeKeyboard() {

    const keyboard = new InlineKeyboard();

    AGES_WITH_CALLBACK.forEach((value) => {
      keyboard.text(value.text, value.callback_data);
    });
    return keyboard;

  }

}