import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ICallback } from '../callback.interface';

@Injectable()
export class LanguageCallback implements ICallback {
  async handle(ctx: MyContext): Promise<void> {
    const callbackQuery = ctx.callbackQuery;
    const language = callbackQuery.data.split('_')[1];

    ctx.session.__language_code = language;
    await ctx.answerCallbackQuery(`Language set to ${language}`);
    if (callbackQuery.message) {
      await ctx.api.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
    }
  }
}
