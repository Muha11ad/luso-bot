import { MyContext } from '../types';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { getLanguageMessage } from '../utils/messages';
import { languageInlineKeyboards } from '../utils/keyboards';

@Injectable()
export class StartCommand implements ICommand {
  async execute(ctx: MyContext): Promise<void> {
    await ctx.reply(getLanguageMessage(ctx), {
      reply_markup: languageInlineKeyboards,
      parse_mode: 'HTML',
    });
  }
}
