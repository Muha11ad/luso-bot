import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ICallback } from '../../callback.interface';
import { deletePrevMessage } from '@/bot/utils/helpers';

@Injectable()
export class SkinTypeCallback implements ICallback {
  async handle(ctx: MyContext): Promise<void> {
    const callbackQuery = ctx.callbackQuery;
    const skinType = callbackQuery.data.split('_')[1];
    ctx.session.rec = { ...ctx.session.rec, skinType };

    await deletePrevMessage(ctx);
  }
}
