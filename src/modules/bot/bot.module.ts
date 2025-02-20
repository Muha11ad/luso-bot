import { HttpModule } from '../http';
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { CommandsService } from './commands';
import { ConversationService } from './conversation';
import { SendContentCommand } from './commands/admin-commands';
import { OrderConversation, SendContentConversation } from './conversation/sub-conversaions';
import { AgeCallback, PurposeCallback, SkinTypeCallback } from './callback/sub-callbacks/recommendation';
import { AppCommand, HelpCommand, LanguageCommand, RecommendationCommand, StartCommand } from './commands/sub-commands';
import { CallbacksService, CancelOrderCallback, ConfirmOrderCallback, LanguageCallback, StartLanguageCallback } from './callback';

@Module({
  imports: [HttpModule],
  providers: [
    BotService,

    AppCommand,
    HelpCommand,
    StartCommand,
    CommandsService,
    LanguageCommand,
    SendContentCommand,
    RecommendationCommand,

    AgeCallback,
    PurposeCallback,
    SkinTypeCallback,
    LanguageCallback,
    CancelOrderCallback,
    ConfirmOrderCallback,
    StartLanguageCallback,

    CallbacksService,
    OrderConversation,
    ConversationService,
    SendContentConversation,

  ],
})
export class BotModule { }
