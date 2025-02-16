import { Bot } from 'grammy';
import { Injectable } from '@nestjs/common';
import { CALLBACK } from '@/shared/utils/consts';
import { MyContext } from '@/shared/utils/types';
import { LanguageCallback } from './sub-callbacks/language.callback';
import { StartLanguageCallback } from './sub-callbacks/start.callback';
import { AgeCallback } from './sub-callbacks/recommendation/age.callback';
import { PurposeCallback } from './sub-callbacks/recommendation/purpose.callback';
import { CancelOrderCallback } from './sub-callbacks/order/cancel-order.callback';
import { ConfirmOrderCallback } from './sub-callbacks/order/confirm-order.callback';
import { SkinTypeCallback } from './sub-callbacks/recommendation/skinType.callback';

@Injectable()
export class CallbacksService {
  constructor(
    private readonly ageCallback: AgeCallback,
    private readonly purposeCallback: PurposeCallback,
    private readonly skinTypeCallback: SkinTypeCallback,
    private readonly languageCallback: LanguageCallback,
    private readonly startCallBack: StartLanguageCallback,
    private readonly cancelOrderCallback: CancelOrderCallback,
    private readonly confirmOrderCallback: ConfirmOrderCallback,
  ) { }

  registerCallbacks(bot: Bot<MyContext>) {

    bot.callbackQuery(CALLBACK.AGE, async (ctx) => this.ageCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.START, async (ctx) => this.startCallBack.handle(ctx));
    bot.callbackQuery(CALLBACK.PURPOSE, async (ctx) => this.purposeCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.LANGUAGE, async (ctx) => this.languageCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.SKIN_TYPE, async (ctx) => this.skinTypeCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.CANCEL_ORDER, async (ctx) => this.cancelOrderCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.CONFIRM_ORDER, async (ctx) => this.confirmOrderCallback.handle(ctx));

  }
}
