import { MyContext } from '@/shared/utils/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICallback } from '../../callback.interface';
import { deletePrevMessage } from '@/shared/utils/helpers';

@Injectable()
export class CancelOrderCallback implements ICallback {

  constructor(private readonly configService: ConfigService) {}

  public async handle(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);

      await ctx.answerCallbackQuery({ text: ctx.t('order_canceled') });

      await ctx.api.sendMessage(this.configService.get('ADMIN_TELEGRAM_ID'), this.getMessage(ctx), {
        parse_mode: 'HTML',
      });

    } catch (error) {

      console.error('Error handling cancel order callback:', error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });

    }

  }

  private getMessage(ctx: MyContext): string {

    return `<b>ORDER CANCELED</b>\n<b>USER ID:</b> #${ctx.from.id}`;

  }

}
