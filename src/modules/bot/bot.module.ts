import { Module } from '@nestjs/common';
import { ApiModule } from '@/modules/api';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HelpCommand, StartCommand, LanguageCommand, CommandsService, RecommendationCommand } from './commands';
import { AgeCallback, CallbacksService, CancelOrderCallback, ConfirmOrderCallback, LanguageCallback, SkinTypeCallback, StartLanguageCallback } from './callback';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule.register(), ApiModule],
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
    CancelOrderCallback,
    ConfirmOrderCallback,
    StartLanguageCallback,
    RecommendationCommand,
  ],
})
export class BotModule { }
