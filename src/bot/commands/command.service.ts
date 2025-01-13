import { Bot } from 'grammy';
import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { HelpCommand } from './sub-commands/help.command';
import { StartCommand } from './sub-commands/start.command';
import { LanguageCommand } from './sub-commands/language.command';
import { RecommendationCommand } from './sub-commands/recommendation.command';

@Injectable()
export class CommandsService {
  constructor(
    private readonly helpCommand: HelpCommand,
    private readonly startCommand: StartCommand,
    private readonly languageCommand: LanguageCommand,
    private readonly recommendationCommand: RecommendationCommand,
  ) {}

  registerCommands(bot: Bot<MyContext>) {
    bot.command('help', async (ctx) => this.helpCommand.execute(ctx));
    bot.command('start', async (ctx) => this.startCommand.execute(ctx));
    bot.command('language', async (ctx) => this.languageCommand.execute(ctx));
    bot.command('recommendation', async (ctx) => this.recommendationCommand.execute(ctx));
  }
}
