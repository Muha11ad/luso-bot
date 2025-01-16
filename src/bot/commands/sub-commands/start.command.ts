import { InlineKeyboard } from 'grammy';
import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { deletePrevMessage } from '@/bot/utils/helpers';
import { START_LANGUAGE_KEYBOARDS } from '@/bot/utils/consts';

@Injectable()
export class StartCommand implements ICommand {
  private getLanguageMessage(ctx: MyContext): string {
    return `
    <strong>${ctx.t('choose_language')} :</strong>
    `;
  }
  private startLanguageInlineKeyboards() {
    const keyboards = START_LANGUAGE_KEYBOARDS.map((keyboard) => [keyboard]);
    return new InlineKeyboard(keyboards);
  }
  async execute(ctx: MyContext): Promise<void> {
    try {
      deletePrevMessage(ctx);

      await ctx.reply(this.getLanguageMessage(ctx), {
        reply_markup: this.startLanguageInlineKeyboards(),
        parse_mode: 'HTML',
      });
    } catch (error) {
      console.log(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    }
  }
}
