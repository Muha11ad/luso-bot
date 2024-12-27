import {
  HelpCommand,
  StartCommand,
  LanguageCommand,
  InstructionCommand,
  RecommendationCommand,
  COMMANDS,
} from './commands';
import { Bot } from 'grammy';
import { ConfigService } from '@nestjs/config';
import { MyContext } from './types/context.type';
import { startLanguageCallback, languageCallback } from './features/callback';
import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot<MyContext>;

  constructor(
    private readonly helpCommand: HelpCommand,
    private readonly startCommand: StartCommand,
    private readonly configService: ConfigService,
    private readonly languageCommand: LanguageCommand,
    private readonly instructionCommand: InstructionCommand,
    private readonly recommendationCommand: RecommendationCommand,
    @Inject('BOT_CONFIG') private readonly botConfig: any,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Bot<MyContext>(token);
  }

  async onModuleInit() {
    try {
      this.bot.use(this.botConfig.sessionMiddleware);
      this.bot.use(this.botConfig.i18nMiddleware);

      this.bot.command(COMMANDS.HELP, async (ctx) => this.helpCommand.execute(ctx));
      this.bot.command(COMMANDS.START, async (ctx) => this.startCommand.execute(ctx));
      this.bot.command(COMMANDS.LANGUAGE, async (ctx) => this.languageCommand.execute(ctx));
      this.bot.command(COMMANDS.INSTRUCTION, async (ctx) => this.instructionCommand.execute(ctx));
      this.bot.command(COMMANDS.RECOMMENDATION, async (ctx) =>
        this.recommendationCommand.execute(ctx),
      );

      this.bot.callbackQuery(['start_uz', 'start_ru', 'start_en'], async (ctx) =>
        startLanguageCallback(ctx),
      );
      this.bot.callbackQuery(['lang_uz', 'lang_ru', 'lang_en'], async (ctx) =>
        languageCallback(ctx),
      );

      await this.bot.start();
    } catch (error) {
      console.error('Failed to start bot:', error);
    }
  }

  async onModuleDestroy() {
    this.bot.stop();
    console.log('Bot stopped!');
  }
}
