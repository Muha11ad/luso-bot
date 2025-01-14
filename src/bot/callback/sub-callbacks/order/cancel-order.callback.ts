import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICallback } from '../../callback.interface';
import { deletePrevMessage } from '@/bot/utils/helpers';

@Injectable()
export class CancelOrderCallback implements ICallback {
  constructor(private readonly configService: ConfigService) {}

  private getMessage(ctx: MyContext): string {
    return `<b>ORDER CANCELED</b>\n<b>USER ID:</b> #${ctx.from.id}`;
  }

  async handle(ctx: MyContext): Promise<void> {
    await deletePrevMessage(ctx);
    await ctx.answerCallbackQuery({ text: ctx.t('order_canceled') });
    await ctx.api.sendMessage(this.configService.get('ADMIN_TELEGRAM_ID'), this.getMessage(ctx), {
      parse_mode: 'HTML',
    });
  }
}
