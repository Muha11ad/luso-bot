import { MyContext } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import { ICallback } from '../callback.interface';

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

      console.log(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
      
    }
  }
}
