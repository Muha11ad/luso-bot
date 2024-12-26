import {
  HelpCommand,
  StartCommand,
  LanguageCommand,
  InstructionCommand,
  RecommendationCommand,
} from './commands';
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule.register()],
  providers: [
    BotService,
    StartCommand,
    HelpCommand,
    LanguageCommand,
    InstructionCommand,
    RecommendationCommand,
  ],
})
export class BotModule {}
