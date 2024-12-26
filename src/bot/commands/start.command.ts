import { Injectable } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';

@Injectable()
export class StartCommand {
  register(bot: Telegraf) {
    bot.start(async (ctx: Context) => {
      await ctx.reply('Welcome! Use /help to see available commands.');
    });
  }
}
