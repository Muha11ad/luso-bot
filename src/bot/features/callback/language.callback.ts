import { MyContext } from '@/bot/types';

export async function languageCallback(ctx: MyContext) {
  const callbackQuery = ctx.callbackQuery;
  const language = callbackQuery.data.split('_')[1];

  ctx.session.__language_code = language;
  await ctx.answerCallbackQuery(`Language set to ${language}`);
  if (callbackQuery.message) {
    await ctx.api.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
  }
}
