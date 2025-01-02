import { MyContext } from '../types';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { getAgeKeyboard } from '../utils/keyboards';
import { deletePrevMessage } from '../utils/helpers';

@Injectable()
export class RecommendationCommand implements ICommand {
  async execute(ctx: MyContext): Promise<void> {
    await deletePrevMessage(ctx);
    await ctx.reply(ctx.t('select_age'), {
      reply_markup: getAgeKeyboard(),
    });
  }
}
