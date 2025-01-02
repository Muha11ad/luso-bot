import { MyContext } from '@/bot/types';
import { getWelcomeMessage } from '@/bot/utils/messages';

export async function startLanguageCallback(ctx: MyContext) {
  const callbackQuery = ctx.callbackQuery;
  const language = callbackQuery.data.split('_')[1];

  ctx.i18n.setLocale(language);
  await ctx.answerCallbackQuery(`Language set to ${language}`);
  if (callbackQuery['message']) {
    await ctx.api.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
  }
  const link =
    'https://www.canva.com/design/DAGUMzY2EEA/QQsYKbgf-6_AGyJufgMp_Q/view?utm_content=DAGUMzY2EEA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1065468fcf';
  await ctx.replyWithPhoto(link, {
    caption: getWelcomeMessage(ctx),
    parse_mode: 'HTML',
  });
}
