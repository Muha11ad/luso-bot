import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TG_CONFIG } from '@/configs/tg.config';
import { MyContext } from '@/shared/utils/types';
import { ICallback } from '../../callback.interface';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class CancelOrderCallback implements ICallback {

  constructor(private readonly configService: ConfigService) { }

  public async handle(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);

      await ctx.answerCallbackQuery({ text: ctx.t('order_canceled') });

      await ctx.api.sendMessage(this.configService.get(TG_CONFIG.adminId), this.getMessage(ctx), {
        parse_mode: 'HTML',
      });

    } catch (error) {

      return handleBotError(error, CancelOrderCallback.name, ctx);

    }

  }

  private getMessage(ctx: MyContext): string {

    return `<b>ORDER CANCELED</b>\n<b>USER ID:</b> #${ctx.from.id}`;

  }

}
