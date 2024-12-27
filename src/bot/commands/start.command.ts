import { MyContext } from '../types';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { startLanguageInlineKeyboards } from '../utils/keyboards';
import { getLanguageMessage, getWelcomeMessage } from '../utils/messages';

@Injectable()
export class StartCommand implements ICommand {
  async execute(ctx: MyContext): Promise<void> {
    if (ctx['message']) {
      await ctx.api.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
    }

    await ctx.reply(getLanguageMessage(ctx), {
      reply_markup: startLanguageInlineKeyboards,
      parse_mode: 'HTML',
    });
  }
}
