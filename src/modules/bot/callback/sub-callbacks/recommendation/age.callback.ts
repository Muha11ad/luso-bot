import { InlineKeyboard } from 'grammy';
import { MyContext } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import { ICallback } from '../../callback.interface';
import { deletePrevMessage, SKIN_TYPES_WITH_CALLBACK } from '@/shared/utils';

@Injectable()
export class AgeCallback implements ICallback {

  public async handle(ctx: MyContext): Promise<void> {

    try {
    
      const callbackQuery = ctx.callbackQuery;
      const age = callbackQuery.data.split('_')[1];
      ctx.session.rec = { ...ctx.session.rec, age };

      await deletePrevMessage(ctx);

      await ctx.reply(ctx.t('select_skin_type'), {
        reply_markup: this.getSkinTypeKeyboard(ctx),
      });
    
    } catch (error) {
    
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    
    }

  }

  private getSkinTypeKeyboard(ctx: MyContext) {

    const keyboard = new InlineKeyboard();

    SKIN_TYPES_WITH_CALLBACK.forEach(({ text, callback_data }) => {
      keyboard.text(ctx.t(text), callback_data);
    });
    return keyboard;

  }

}

