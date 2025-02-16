import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { MyContext } from '@/shared/utils/types';
import { COMMANDS } from '@/shared/utils/consts';
import { handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class HelpCommand implements ICommand {

  public async execute(ctx: MyContext): Promise<void> {
    
    try {
    
      await ctx.reply(this.prepareHelpMessage(ctx));
    
    } catch (error) {
    
      return handleBotError(error, COMMANDS.HELP, ctx);
    
    }
  }

  private prepareHelpMessage(ctx: MyContext): string {

    return `
    ${ctx.t('help_message')} \n${ctx.t('help_second_message')}
    `;
  
  }

}
