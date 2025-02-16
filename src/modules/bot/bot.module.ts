import { Module } from '@nestjs/common';
import { ApiModule } from '@/modules/api';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppCommand } from './commands/sub-commands/app.command';
import { SendContentCommand } from './commands/admin-commands/sendContent.command';
import { AgeCallback } from './callback/sub-callbacks/recommendation/age.callback';
import { PurposeCallback } from './callback/sub-callbacks/recommendation/purpose.callback';
import { SkinTypeCallback } from './callback/sub-callbacks/recommendation/skinType.callback';
import { HelpCommand, StartCommand, LanguageCommand, CommandsService, RecommendationCommand } from './commands';
import { CallbacksService, CancelOrderCallback, ConfirmOrderCallback, LanguageCallback, StartLanguageCallback } from './callback';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule.register(), ApiModule],
  providers: [
    AppCommand,
    BotService,
    HelpCommand,
    AgeCallback,
    StartCommand,
    PurposeCallback,
    LanguageCommand,
    CommandsService,
    CallbacksService,
    LanguageCallback,
    SkinTypeCallback,
    SendContentCommand,
    CancelOrderCallback,
    ConfirmOrderCallback,
    StartLanguageCallback,
    RecommendationCommand,
  ],
})
export class BotModule { }
