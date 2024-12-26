import { Context } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';

@Injectable()
export class InstructionCommand implements ICommand {
  async execute(ctx: Context): Promise<void> {
    await ctx.reply('input product ...');
  }
}
