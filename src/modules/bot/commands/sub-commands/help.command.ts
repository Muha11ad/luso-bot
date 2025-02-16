import { Injectable } from '@nestjs/common';
import { MyContext } from '@/shared/types';
import { ICommand } from '../command.interface';

@Injectable()
export class HelpCommand implements ICommand {

  public async execute(ctx: MyContext): Promise<void> {
    
    try {
    
      await ctx.reply(this.prepareHelpMessage(ctx));
    
    } catch (error) {
    
      console.error(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    
    }
  }

  private prepareHelpMessage(ctx: MyContext): string {

    return `
    ${ctx.t('help_message')} \n${ctx.t('help_second_message')}
    `;
  
  }

}
