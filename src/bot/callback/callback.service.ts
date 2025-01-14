import { Bot } from 'grammy';
import { MyContext } from '@/bot/types';
import { CALLBACK } from '../utils/consts';
import { Injectable } from '@nestjs/common';
import { LanguageCallback } from './sub-callbacks/language.callback';
import { StartLanguageCallback } from './sub-callbacks/start.callback';
import { AgeCallback } from './sub-callbacks/recommendation/age.callback';
import { SkinTypeCallback } from './sub-callbacks/recommendation/skin-type.callback';
import { CancelOrderCallback } from './sub-callbacks/order/cancel-order.callback';
import { ConfirmOrderCallback } from './sub-callbacks/order/confirm-order.callback';

@Injectable()
export class CallbacksService {
  constructor(
    private readonly ageCallback: AgeCallback,
    private readonly languageCallback: LanguageCallback,
    private readonly skinTypeCallback: SkinTypeCallback,
    private readonly startCallBack: StartLanguageCallback,
    private readonly cancelOrderCallback: CancelOrderCallback,
    private readonly confirmOrderCallback: ConfirmOrderCallback,
  ) {}

  registerCallbacks(bot: Bot<MyContext>) {
    bot.callbackQuery(CALLBACK.AGE, async (ctx) => this.ageCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.START, async (ctx) => this.startCallBack.handle(ctx));
    bot.callbackQuery(CALLBACK.LANGUAGE, async (ctx) => this.languageCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.SKIN_TYPE, async (ctx) => this.skinTypeCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.CANCEL_ORDER, async (ctx) => this.cancelOrderCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.CONFIRM_ORDER, async (ctx) => this.confirmOrderCallback.handle(ctx));
  }
}
