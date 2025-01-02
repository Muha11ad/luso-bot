import { MyContext } from '@/bot/types';
import { deletePrevMessage } from '@/bot/utils/helpers';
import { getSkinTypeKeyboard } from '@/bot/utils/keyboards';

export async function ageCallback(ctx: MyContext) {
  const callbackQuery = ctx.callbackQuery;
  const age = callbackQuery.data;
  ctx.session.rec.age = age;

  await deletePrevMessage(ctx);

  await ctx.reply('What is your skin type?', {
    reply_markup: getSkinTypeKeyboard(),
  });
}
