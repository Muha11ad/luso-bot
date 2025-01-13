import {
  AgeCallback,
  CallbacksService,
  LanguageCallback,
  SkinTypeCallback,
  StartLanguageCallback,
} from './callback';
import {
  HelpCommand,
  StartCommand,
  LanguageCommand,
  RecommendationCommand,
  CommandsService,
} from './commands';
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { botConfigProvider } from '@/config';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule.register()],
  providers: [
    BotService,
    HelpCommand,
    AgeCallback,
    StartCommand,
    LanguageCommand,
    CommandsService,
    CallbacksService,
    LanguageCallback,
    SkinTypeCallback,
    botConfigProvider,
    StartLanguageCallback,
    RecommendationCommand,
  ],
})
export class BotModule {}
