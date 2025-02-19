import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { HttpModule } from '../http/http.module';
import { AppCommand } from './commands/sub-commands/app.command';
import { ConversationService } from './conversation/conversation.service';
import { AgeCallback } from './callback/sub-callbacks/recommendation/age.callback';
import { SendContentCommand } from './commands/admin-commands/sendContent.command';
import { OrderConversation } from './conversation/sub-conversaions/order.conversation';
import { PurposeCallback } from './callback/sub-callbacks/recommendation/purpose.callback';
import { SkinTypeCallback } from './callback/sub-callbacks/recommendation/skinType.callback';
import { SendContentConversation } from './conversation/sub-conversaions/sendContent.conversation';
import { HelpCommand, StartCommand, LanguageCommand, CommandsService, RecommendationCommand } from './commands';
import { CallbacksService, CancelOrderCallback, ConfirmOrderCallback, LanguageCallback, StartLanguageCallback } from './callback';

@Module({
  imports: [HttpModule],
  providers: [
    AppCommand,
    BotService,
    AgeCallback,
    HelpCommand,
    StartCommand,
    LanguageCommand,
    PurposeCallback,
    CommandsService,
    CallbacksService,
    SkinTypeCallback,
    LanguageCallback,
    OrderConversation,
    SendContentCommand,
    CancelOrderCallback,
    ConversationService,
    ConfirmOrderCallback,
    StartLanguageCallback,
    RecommendationCommand,
    SendContentConversation,

  ],
})
export class BotModule { }
