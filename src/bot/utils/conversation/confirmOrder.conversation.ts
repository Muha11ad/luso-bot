import { MyContext } from '@/bot/types';
import { Conversation } from '@grammyjs/conversations';

export async function confirmOrderConversation(
  conversation: Conversation<MyContext>,
  ctx: MyContext,
) {
  const imageMessage = await conversation.waitFor('message:photo');
  if (!imageMessage.message?.photo) {
    await ctx.reply(ctx.t('send_only_image'));
    return;
  }

  const photo = imageMessage.message.photo[imageMessage.message.photo.length - 1];
  const adminChatId = process.env.ADMIN_TELEGRAM_ID;
  await ctx.api.sendPhoto(adminChatId, photo.file_id, {
    caption: `#${ctx.from.id}`,
  });

  await ctx.reply(ctx.t('send_only_location'));

  const locationMessage = await conversation.waitFor('message:location');
  if (!locationMessage.message?.location) {
    await ctx.reply(ctx.t('send_only_location'));
    return;
  }

  const location = locationMessage.message.location;
  await ctx.api.sendVenue(
    adminChatId,
    location.latitude,
    location.longitude,
    `#${ctx.from.id}`,
    'LOCATION',
  );
  await ctx.reply(ctx.t('conversation_end'));
  await ctx.conversation.exit('confirmOrderConversation');
}
