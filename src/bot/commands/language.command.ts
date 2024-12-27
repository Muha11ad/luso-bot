import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { MyContext } from '../types/context.type';
import { getLanguageMessage } from '../utils/messages';
import { filteredLanguageInlineKeyboards } from '../utils/keyboards';

@Injectable()
export class LanguageCommand implements ICommand {
  async execute(ctx: MyContext): Promise<void> {
    await ctx.reply(getLanguageMessage(ctx), {
      reply_markup: filteredLanguageInlineKeyboards(ctx.session.__language_code),
      parse_mode: 'HTML',
    });
  }
}
