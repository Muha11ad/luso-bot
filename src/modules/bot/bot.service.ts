import { i18n } from '@/configs';
import { Bot, session } from 'grammy';
import { CommandsService } from './commands';
import { CallbacksService } from './callback';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from '@/shared/logger/custom.logger';
import { confirmOrderConversation } from '@/shared/conversation';
import { MyBotError, MyContext, SessionData } from '@/shared/utils/types';
import { conversations, createConversation } from '@grammyjs/conversations';
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { sendContentConversation } from '@/shared/conversation/sendContent.conversation';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot<MyContext>;
  private logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandsService: CommandsService,
    private readonly callbacksService: CallbacksService,
  ) {
    const token = this.configService.get('tg.botToken');
    this.bot = new Bot<MyContext>(token);
    this.logger = new CustomLogger('BotService');
  }

  async onModuleInit() {

    try {

      this.bot.use( session({ initial: (): SessionData => ({
            rec: {},
            step: '',
            __language_code: undefined,
          }),
        }),
      );

      this.bot.use(i18n.middleware());
      this.bot.use(conversations());
      this.bot.use(createConversation(confirmOrderConversation));
      this.bot.use(createConversation(sendContentConversation));

      this.commandsService.registerCommands(this.bot);
      this.callbacksService.registerCallbacks(this.bot);

      // fixxx
      this.bot.catch((err: MyBotError) => {
        
        console.log('Error message:', err.message);
        console.log('Error cause:', err.cause);
        console.log('Error stack:', err.stack);
        

        const ctx = err.ctx;

        if (err.error.error_code === 403) {

          this.logger.error('Bot was blocked by user:', ctx.from.id.toString());
          return;
        
        }

        ctx.reply(ctx.t('server_error'));
      
      });
      
      await this.bot.start();
    
    } catch (error) {

      this.logger.error('Error:', error);     
    
    }

  }

  async onModuleDestroy() {

    this.bot.stop();
    this.logger.log('Bot stopped');
    
  }
}
