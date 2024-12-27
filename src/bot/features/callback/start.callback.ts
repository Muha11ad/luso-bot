import { MyContext } from '@/bot/types';
import { getWelcomeMessage } from '@/bot/utils/messages';

export async function startLanguageCallback(ctx: MyContext) {
  const callbackQuery = ctx.callbackQuery;
  const language = callbackQuery.data.split('_')[1];

  ctx.i18n.setLocale(language);
  await ctx.answerCallbackQuery(`Language set to ${language}`);
  if (callbackQuery.message) {
    await ctx.api.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
  }
  const link =
    'https://thehebespa.com/wp-content/uploads/2023/06/A-Beginners-Guide-to-Cosmetic-Aesthetics.webp';
  await ctx.replyWithPhoto(link, {
    caption: getWelcomeMessage(ctx),
    parse_mode: 'HTML',
  });
}
