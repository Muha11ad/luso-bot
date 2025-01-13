import { Bot } from 'grammy';
import { MyContext } from '@/bot/types';
import { CALLBACK } from '../utils/consts';
import { Injectable } from '@nestjs/common';
import { LanguageCallback } from './sub-callbacks/language.callback';
import { StartLanguageCallback } from './sub-callbacks/start.callback';
import { AgeCallback } from './sub-callbacks/recommendation/age.callback';
import { SkinTypeCallback } from './sub-callbacks/recommendation/skin-type.callback';

@Injectable()
export class CallbacksService {
  constructor(
    private readonly ageCallback: AgeCallback,
    private readonly languageCallback: LanguageCallback,
    private readonly skinTypeCallback: SkinTypeCallback,
    private readonly startCallBack: StartLanguageCallback,
  ) {}

  registerCallbacks(bot: Bot<MyContext>) {
    bot.callbackQuery(CALLBACK.AGE, async (ctx) => this.ageCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.START, async (ctx) => this.startCallBack.handle(ctx));
    bot.callbackQuery(CALLBACK.SKIN_TYPE, async (ctx) => this.skinTypeCallback.handle(ctx));
    bot.callbackQuery(CALLBACK.LANGUAGE, async (ctx) => this.languageCallback.handle(ctx));
  }
}
