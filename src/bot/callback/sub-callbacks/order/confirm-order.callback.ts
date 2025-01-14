import { MyContext } from '@/bot/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICallback } from '../../callback.interface';

@Injectable()
export class ConfirmOrderCallback implements ICallback {
  constructor(private readonly configService: ConfigService) {}

  private async editMessage(ctx: MyContext) {
    if (ctx.callbackQuery?.message) {
      await ctx.api.editMessageReplyMarkup(
        ctx.callbackQuery.message.chat.id,
        ctx.callbackQuery.message.message_id,
        {
          reply_markup: null,
        },
      );
    }
  }
  private getMessage(ctx: MyContext): string {
    const cartDetails = this.configService.get('CART_DETAILS');
    return `<b>${ctx.t('pay_order')}:</b>\n${cartDetails}`;
  }

  async handle(ctx: MyContext): Promise<void> {
    await this.editMessage(ctx);
    await ctx.reply(this.getMessage(ctx), {
      parse_mode: 'HTML',
    });
    await ctx.conversation.enter('confirmOrderConversation');
  }
}
