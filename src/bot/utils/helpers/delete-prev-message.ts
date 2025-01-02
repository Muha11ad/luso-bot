import { MyContext } from '@/bot/types';

export async function deletePrevMessage(ctx: MyContext) {
  if (ctx['message']) {
    await ctx.api.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
  } else if (ctx['callbackQuery']) {
    await ctx.api.deleteMessage(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
    );
  }
}
