import {
  HelpCommand,
  StartCommand,
  LanguageCommand,
  InstructionCommand,
  RecommendationCommand,
} from './commands';
import { resolve } from 'path';
import { EmojiFlavor } from '@grammyjs/emoji';
import { ConfigService } from '@nestjs/config';
import { I18n, I18nFlavor } from '@grammyjs/i18n';
import { Bot, Context, session, SessionFlavor } from 'grammy';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot;

  constructor(
    private readonly helpCommand: HelpCommand,
    private readonly startCommand: StartCommand,
    private readonly configService: ConfigService,
    private readonly languageCommand: LanguageCommand,
    private readonly instructionCommand: InstructionCommand,
    private readonly recommendationCommand: RecommendationCommand,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Bot(token);
  }

  async onModuleInit() {
    interface SessionData {
      __language_code?: string;
    }

    type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor & EmojiFlavor<Context>;
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
