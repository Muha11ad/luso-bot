import { InlineKeyboard } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { MyContext } from '@/shared/utils/types';
import { handleBotError } from '@/shared/utils/helpers';
import { COMMANDS, LANGUAGE_KEYBOARDS } from '@/shared/utils/consts';

@Injectable()
export class LanguageCommand implements ICommand {

  public async execute(ctx: MyContext): Promise<void> {

    try {

      await ctx.reply(this.getLanguageMessage(ctx), {
        reply_markup: this.filteredLanguageInlineKeyboards(ctx.session.__language_code),
        parse_mode: 'HTML',
      });
    
    } catch (error) {
    
      return handleBotError(error, COMMANDS.LANGUAGE, ctx);
    
    }
  }

  private filteredLanguageInlineKeyboards(language: string): InlineKeyboard {

    const keyboards = LANGUAGE_KEYBOARDS.filter((button) => button.callback_data !== language);
    return new InlineKeyboard(keyboards.map((button) => [button]));

  }

  private getLanguageMessage(ctx: MyContext): string {

    return `<strong>${ctx.t('choose_language')}:</strong>`;
  
  }
}
