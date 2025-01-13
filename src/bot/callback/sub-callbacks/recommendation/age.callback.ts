import { MyContext } from '@/bot/types';
import { InlineKeyboard } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICallback } from '../../callback.interface';
import { deletePrevMessage } from '@/bot/utils/helpers';
import { SKIN_TYPES_WITH_CALLBACK } from '@/bot/utils/consts';

@Injectable()
export class AgeCallback implements ICallback {
  private getSkinTypeKeyboard(ctx: MyContext) {
    const keyboard = new InlineKeyboard();
    SKIN_TYPES_WITH_CALLBACK.forEach(({ text, callback_data }) => {
      keyboard.text(ctx.t(text), callback_data);
    });
    return keyboard;
  }
  async handle(ctx: MyContext): Promise<void> {
    const callbackQuery = ctx.callbackQuery;
    const age = callbackQuery.data.split('_')[1];
    ctx.session.rec = { ...ctx.session.rec, age };

    await deletePrevMessage(ctx);

    await ctx.reply(ctx.t('select_skin_type'), {
      reply_markup: this.getSkinTypeKeyboard(ctx),
    });
  }
}
