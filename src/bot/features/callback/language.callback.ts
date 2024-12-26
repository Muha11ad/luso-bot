import { MyContext } from '@/bot/types';

export async function languageCallback(ctx: MyContext) {
  const callbackQuery = ctx.callbackQuery;
  const language = callbackQuery.data;
  console.log(ctx);

  ctx.session.language = language;
  await ctx.answerCallbackQuery(`Language set to ${language}`);
  if (callbackQuery.message) {
    await ctx.api.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
  }
}
