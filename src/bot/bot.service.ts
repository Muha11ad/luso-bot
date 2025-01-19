import { Bot, session } from 'grammy';
import { i18n } from '@/config';
import { MyBotError, SessionData } from './types';
import { CommandsService } from './commands';
import { CallbacksService } from './callback';
import { ConfigService } from '@nestjs/config';
import { MyContext } from './types/context.type';
import { confirmOrderConversation } from './utils/conversation';
import { conversations, createConversation } from '@grammyjs/conversations';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot<MyContext>;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandsService: CommandsService,
    private readonly callbacksService: CallbacksService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Bot<MyContext>(token);
  }

  async onModuleInit() {
    try {
      this.bot.use(
        session({
          initial: (): SessionData => ({
            rec: {},
            step: '',
            __language_code: undefined,
          }),
        }),
      );
      this.bot.use(i18n.middleware());
      this.bot.use(conversations());
      this.bot.use(createConversation(confirmOrderConversation));
      this.commandsService.registerCommands(this.bot);
      this.callbacksService.registerCallbacks(this.bot);

      this.bot.catch((err: MyBotError) => {
        const ctx = err.ctx;
        console.log('Error:', err.error);

        if (err.error.error_code === 403) {
          console.log(`Bot was blocked by user ${ctx.from.id}`);
          return;
        }
        ctx.reply(ctx.t('server_error'));
      });
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
