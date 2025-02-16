import { InlineKeyboard } from 'grammy';
import { MyContext } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { deletePrevMessage, START_LANGUAGE_KEYBOARDS } from '@/shared/utils';

@Injectable()
export class StartCommand implements ICommand {

  public async execute(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);

      await ctx.reply(this.getLanguageMessage(ctx), {
        reply_markup: this.startLanguageInlineKeyboards(),
        parse_mode: 'HTML',
      });

    } catch (error) {

      console.log(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });

    }
    
  }

  private getLanguageMessage(ctx: MyContext): string {

    return `
    <strong>${ctx.t('choose_language')} :</strong>
    `;

  }

  private startLanguageInlineKeyboards() {

    const keyboards = START_LANGUAGE_KEYBOARDS.map((keyboard) => [keyboard]);
    return new InlineKeyboard(keyboards);

  }

}
