import { MyContext } from '@/shared/types';
import { Conversation } from '@grammyjs/conversations';

export async function confirmOrderConversation(
  conversation: Conversation<MyContext>,
  ctx: MyContext,
) {
  try {
    // Wait for an image
    const imageMessage = await conversation.waitFor(':photo', {
      otherwise: (ctx) => ctx.reply(ctx.t('send_only_image')),
    });

    const photo = imageMessage.message.photo[imageMessage.message.photo.length - 1];
    const adminChatId = process.env.ADMIN_TELEGRAM_ID;
    await ctx.api.sendPhoto(adminChatId, photo.file_id, {
      caption: `#${ctx.from.id}`,
    });

    await ctx.reply(ctx.t('send_only_location'));

    // Wait for a location
    const locationMessage = await conversation.waitFor(':location', {
      otherwise: (ctx) => ctx.reply(ctx.t('send_only_location')),
    });

    const location = locationMessage.message.location;
    await ctx.api.sendVenue(
      adminChatId,
      location.latitude,
      location.longitude,
      `#${ctx.from.id}`,
      'LOCATION',
    );

    await ctx.reply(ctx.t('conversation_end'));
    return
  } catch (error) {
    console.error(error);
    await ctx.reply(ctx.t('server_error'));
  }
}
