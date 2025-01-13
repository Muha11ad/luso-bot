import { MyContext } from '@/bot/types';
import { deletePrevMessage } from '@/bot/utils/helpers';
import { getWelcomeMessage } from '@/bot/utils/messages';

export async function startLanguageCallback(ctx: MyContext) {
  const callbackQuery = ctx.callbackQuery;
  const language = callbackQuery.data.split('_')[1];

  ctx.i18n.setLocale(language);
  await ctx.answerCallbackQuery(`Language set to ${language}`);
  deletePrevMessage(ctx);

  await ctx.reply(getWelcomeMessage(ctx), {
    parse_mode: 'Markdown',
  });
}
