import { Injectable } from '@nestjs/common';
import { ICommand } from '../command.interface';
import { MyContext } from '@/shared/utils/types';
import { COMMANDS } from '@/shared/utils/consts';
import { deletePrevMessage, formatMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class HelpCommand implements ICommand {

  public async execute(ctx: MyContext): Promise<void> {
    
    try {
    
      await deletePrevMessage(ctx);

      await ctx.reply(formatMessage(ctx.t('help_message')));
    
    } catch (error) {
    
      return handleBotError(error, COMMANDS.HELP, ctx);
    
    }
  }

}
