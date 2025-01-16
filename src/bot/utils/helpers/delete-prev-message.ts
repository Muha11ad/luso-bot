import { MyContext } from '@/bot/types';

export async function deletePrevMessage(ctx: MyContext) {
  try {
    if (ctx?.message && ctx?.message?.chat && ctx?.message?.chat?.id) {
      await ctx.api.deleteMessage(ctx?.message?.chat?.id, ctx?.message?.message_id);
    } else if (
      ctx.callbackQuery &&
      ctx.callbackQuery?.message &&
      ctx.callbackQuery?.message?.chat &&
      ctx.callbackQuery?.message?.chat?.id
    ) {
      await ctx.api.deleteMessage(
        ctx?.callbackQuery?.message?.chat.id,
        ctx?.callbackQuery?.message?.message_id,
      );
    } else {
      throw new Error('Message or chat or id not found');
    }
  } catch (error) {
    console.error('Failed to delete previous message:', error);
  }
}
