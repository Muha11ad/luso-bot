import { InlineKeyboard } from 'grammy';
import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { LANGUAGE_KEYBOARDS } from '@/bot/utils/consts';

@Injectable()
export class LanguageCommand implements ICommand {
  private getLanguageMessage(ctx: MyContext): string {
    return `<strong>${ctx.t('choose_language')}:</strong>`;
  }

  private filteredLanguageInlineKeyboards(language: string): InlineKeyboard {
    const keyboards = LANGUAGE_KEYBOARDS.filter((button) => button.callback_data !== language);

    return new InlineKeyboard(keyboards.map((button) => [button]));
  }

  async execute(ctx: MyContext): Promise<void> {
    try {
      await ctx.reply(this.getLanguageMessage(ctx), {
        reply_markup: this.filteredLanguageInlineKeyboards(ctx.session.__language_code),
        parse_mode: 'HTML',
      });
    } catch (error) {
      console.log(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    }
  }
}
