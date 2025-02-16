import { Module } from '@nestjs/common';
import { ApiModule } from '@/modules/api';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppCommand } from './commands/sub-commands/app.command';
import { HelpCommand, StartCommand, LanguageCommand, CommandsService, RecommendationCommand } from './commands';
import { RecommendationCallback, CallbacksService, CancelOrderCallback, ConfirmOrderCallback, LanguageCallback, StartLanguageCallback } from './callback';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule.register(), ApiModule],
  providers: [
    AppCommand,
    BotService,
    HelpCommand,
    StartCommand,
    LanguageCommand,
    CommandsService,
    CallbacksService,
    LanguageCallback,
    CancelOrderCallback,
    ConfirmOrderCallback,
    StartLanguageCallback,
    RecommendationCommand,
    RecommendationCallback
  ],
})
export class BotModule { }
