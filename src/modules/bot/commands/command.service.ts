import { Bot } from 'grammy';
import { Injectable } from '@nestjs/common';
import { COMMANDS } from '@/shared/utils/consts';
import { MyContext } from '@/shared/utils/types';
import { AppCommand } from './sub-commands/app.command';
import { HelpCommand } from './sub-commands/help.command';
import { StartCommand } from './sub-commands/start.command';
import { LanguageCommand } from './sub-commands/language.command';
import { SendContentCommand } from './admin-commands/sendContent.command';
import { RecommendationCommand } from './sub-commands/recommendation.command';

@Injectable()
export class CommandsService {
  constructor(
    private readonly appCommand: AppCommand,
    private readonly helpCommand: HelpCommand,
    private readonly startCommand: StartCommand,
    private readonly languageCommand: LanguageCommand,
    private readonly sentContentCommand: SendContentCommand,
    private readonly recommendationCommand: RecommendationCommand,
  ) {}

  registerCommands(bot: Bot<MyContext>) {
    bot.command(COMMANDS.APP, async (ctx) => this.appCommand.execute(ctx));
    bot.command(COMMANDS.HELP, async (ctx) => this.helpCommand.execute(ctx));
    bot.command(COMMANDS.START, async (ctx) => this.startCommand.execute(ctx));
    bot.command(COMMANDS.LANGUAGE, async (ctx) => this.languageCommand.execute(ctx));
    bot.command(COMMANDS.SEND_CONTENT, async (ctx) => this.sentContentCommand.execute(ctx));
    bot.command(COMMANDS.RECOMMENDATION, async (ctx) => this.recommendationCommand.execute(ctx));
  }
}
