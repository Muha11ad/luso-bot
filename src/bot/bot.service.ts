import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { StartCommand } from './commands/start.command';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor(
    private readonly configService: ConfigService,
    private readonly startCommand: StartCommand,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Telegraf(token);
  }

  async onModuleInit() {
    try {
      // Register commands
      this.startCommand.register(this.bot);
      // Start the bot
      await this.bot.launch();
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
