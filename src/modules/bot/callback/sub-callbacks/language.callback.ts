import { Injectable } from '@nestjs/common';
import { MyContext } from '@/shared/utils/types';
import { ICallback } from '../callback.interface';
import { handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class LanguageCallback implements ICallback {

  public async handle(ctx: MyContext): Promise<void> {

    try {

      const callbackQuery = ctx.callbackQuery;
      const language = callbackQuery.data.split('_')[1];

      ctx.session.__language_code = language;

      await ctx.answerCallbackQuery(`Language set to ${language}`);

      if (callbackQuery.message) {
        await ctx.api.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
      }

    } catch (error) {

      return handleBotError(error, LanguageCallback.name, ctx);

    }
  }

}
