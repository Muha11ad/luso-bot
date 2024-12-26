import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { StartCommand } from './commands/start.command';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  providers: [BotService, StartCommand],
})
export class BotModule {}
