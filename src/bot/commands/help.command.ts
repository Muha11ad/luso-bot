import { Context } from 'grammy';
import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelpCommand implements ICommand {
  constructor(private readonly configService: ConfigService) {}

  private prepareHelpMessage(): string {
    const admin_username = this.configService.get<string>('ADMIN_USERNAME');
    return `Any questions? Feel free to ask ${admin_username}!`;
  }

  async execute(ctx: Context): Promise<void> {
    await ctx.reply(this.prepareHelpMessage());
  }
}
