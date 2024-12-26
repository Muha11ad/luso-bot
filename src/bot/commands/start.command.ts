import { Context } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';

@Injectable()
export class StartCommand implements ICommand {
  async execute(ctx: Context): Promise<void> {
    await ctx.reply('Hello! I am your bot!');
  }
}
