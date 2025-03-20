import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { MyContext } from '@/shared/utils/types';
import { InlineKeyboard, InputFile } from 'grammy';
import { ICallback } from '../../callback.interface';
import { SKIN_TYPES_WITH_CALLBACK } from '@/shared/utils/consts';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class AgeCallback implements ICallback {

  constructor() { }

  public async handle(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);
      
      const callbackQuery = ctx.callbackQuery;
      const age = callbackQuery.data.split('_')[1];
      ctx.session.rec = { ...ctx.session.rec, age };

      const imagePath = path.resolve(__dirname, "../../../../../../public/skin-types.jpg");
      
      await ctx.replyWithPhoto(new InputFile(imagePath), {
        caption: ctx.t('select_skin_type'),
        reply_markup: this.getSkinTypeKeyboard(ctx),
      });

    } catch (error) {

      return handleBotError(error, AgeCallback.name, ctx);

    }
  }

  private getSkinTypeKeyboard(ctx: MyContext) {

    const keyboard = new InlineKeyboard();
    SKIN_TYPES_WITH_CALLBACK.forEach(({ text, callback_data }) => {
      keyboard.text(ctx.t(text), callback_data).row()
    });
    return keyboard;

  }

}