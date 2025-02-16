import { InlineKeyboard, Keyboard } from 'grammy';
import { ApiService } from '@/modules/api';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { MyContext } from "@/shared/utils/types";
import { UserCreateReq } from '@/modules/api/api.types';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';
import { COMMANDS, START_LANGUAGE_KEYBOARDS } from '@/shared/utils/consts';

@Injectable()
export class StartCommand implements ICommand {

  constructor(private readonly apiService: ApiService) { }

  public async execute(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);

      const data: UserCreateReq = {
        telegramId: ctx.from.id,
        name: ctx.from.first_name,
        username: ctx.from?.username,
      }

      await this.apiService.createOrGetUser(data);

      await ctx.reply(this.getLanguageMessage(ctx), {
        reply_markup: this.startLanguageInlineKeyboards(),
        parse_mode: 'HTML',
      });

    } catch (error) {

      return handleBotError(error, COMMANDS.START, ctx);

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
