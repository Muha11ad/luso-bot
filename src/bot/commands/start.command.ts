import { MyContext } from '../types';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { deletePrevMessage } from '../utils/helpers';
import { getLanguageMessage } from '../utils/messages';
import { startLanguageInlineKeyboards } from '../utils/keyboards';

@Injectable()
export class StartCommand implements ICommand {
  async execute(ctx: MyContext): Promise<void> {
    deletePrevMessage(ctx);

    await ctx.reply(getLanguageMessage(ctx), {
      reply_markup: startLanguageInlineKeyboards,
      parse_mode: 'HTML',
    });
  }
}
