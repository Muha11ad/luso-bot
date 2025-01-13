import { MyContext } from '../../types';
import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';

@Injectable()
export class HelpCommand implements ICommand {
  private prepareHelpMessage(ctx: MyContext): string {
    return `
    ${ctx.t('help_message')} \n${ctx.t('help_second_message')}
    `;
  }

  async execute(ctx: MyContext): Promise<void> {
    await ctx.reply(this.prepareHelpMessage(ctx));
  }
}
