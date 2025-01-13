import { Bot } from 'grammy';
import { CommandsService } from './commands';
import { CallbacksService } from './callback';
import { ConfigService } from '@nestjs/config';
import { MyContext } from './types/context.type';
import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot<MyContext>;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandsService: CommandsService,
    private readonly callbacksService: CallbacksService,
    @Inject('BOT_CONFIG') private readonly botConfig: any,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Bot<MyContext>(token);
  }

  async onModuleInit() {
    try {
      this.bot.use(this.botConfig.sessionMiddleware);
      this.bot.use(this.botConfig.i18nMiddleware);

      this.commandsService.registerCommands(this.bot);
      this.callbacksService.registerCallbacks(this.bot);

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
