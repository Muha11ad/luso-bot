import { ICommand } from '../command.interface';
import { MyContext } from "@/shared/utils/types";
import { InlineKeyboard, Keyboard } from 'grammy';
import { HttpServer, Injectable } from '@nestjs/common';
import { UserCreateReq } from '@/modules/http/http.types';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';
import { COMMANDS, START_LANGUAGE_KEYBOARDS } from '@/shared/utils/consts';
import { UserHttpService } from '@/modules/http/services/user.http.service';

@Injectable()
export class StartCommand implements ICommand {

  constructor(private readonly userHttpServive: UserHttpService) { }

  public async execute(ctx: MyContext): Promise<void> {

    try {
      
      await deletePrevMessage(ctx);

      const data: UserCreateReq = {
        telegramId: String(ctx.from.id),
        name: ctx.from.first_name,
        username: ctx.from?.username,
      }
      
      await this.userHttpServive.createOrGetUser(data);

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
