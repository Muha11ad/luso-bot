import { Bot } from 'grammy';
import { Injectable } from '@nestjs/common';
import { CALLBACK } from '@/shared/utils/consts';
import { MyContext } from '@/shared/utils/types';
import { LanguageCallback } from './sub-callbacks/language.callback';
import { StartLanguageCallback } from './sub-callbacks/start.callback';
import { CancelOrderCallback } from './sub-callbacks/order/cancel-order.callback';
import { ConfirmOrderCallback } from './sub-callbacks/order/confirm-order.callback';
import { RecommendationCallback } from './sub-callbacks/recommendation.callback';

@Injectable()
export class CallbacksService {
  constructor(
    private readonly languageCallback: LanguageCallback,
    private readonly startCallBack: StartLanguageCallback,
    private readonly cancelOrderCallback: CancelOrderCallback,
    private readonly confirmOrderCallback: ConfirmOrderCallback,
    private readonly recommendationCallback: RecommendationCallback
  ) {}

  registerCallbacks(bot: Bot<MyContext>) {

    bot.callbackQuery(CALLBACK.START, async (ctx) => this.startCallBack.handle(ctx));
    bot.callbackQuery(CALLBACK.LANGUAGE, async (ctx) => this.languageCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.PURPOSE, async (ctx) => this.recommendationCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.CANCEL_ORDER, async (ctx) => this.cancelOrderCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.CONFIRM_ORDER, async (ctx) => this.confirmOrderCallback.handle(ctx));
  }
}
