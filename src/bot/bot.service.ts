import {
  HelpCommand,
  StartCommand,
  LanguageCommand,
  InstructionCommand,
  RecommendationCommand,
} from './commands';
import { resolve } from 'path';
import { I18n } from '@grammyjs/i18n';
import { Bot, session } from 'grammy';
import { ConfigService } from '@nestjs/config';
import { MyContext } from './types/context.type';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { languageCallback } from './features/callback/language.callback';

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
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Bot<MyContext>(token);
  }

  async onModuleInit() {
    const filePath = resolve(process.cwd(), 'locales');

    const i18n = new I18n<MyContext>({
      defaultLocale: 'ru',
      useSession: true,
      directory: filePath,
    });

    this.bot.use(
      session({
        initial: () => {
          return {};
        },
      }),
    );

    this.bot.use(i18n.middleware());

    try {
      this.bot.command('help', async (ctx) => this.helpCommand.execute(ctx));
      this.bot.command('start', async (ctx) => this.startCommand.execute(ctx));
      this.bot.command('language', async (ctx) => this.languageCommand.execute(ctx));
      this.bot.command('instruction', async (ctx) => this.instructionCommand.execute(ctx));
      this.bot.command('recommendation', async (ctx) => this.recommendationCommand.execute(ctx));
      this.bot.callbackQuery(['uz', 'ru', 'en'], async (ctx) => languageCallback(ctx));
      await this.bot.start();
      console.log('Bot started!');
    } catch (error) {
      console.error('Failed to start bot:', error);
    }
  }

  async onModuleDestroy() {
    this.bot.stop();
    console.log('Bot stopped!');
  }
}
