import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyContext } from '@/shared/utils/types';
import { ICallback } from '../../callback.interface';
import { CONVERSATIONS } from '@/shared/utils/consts';

@Injectable()
export class ConfirmOrderCallback implements ICallback {

  constructor(private readonly configService: ConfigService) {}

  public async handle(ctx: MyContext): Promise<void> {

    try {

      await this.editMessage(ctx);
      await ctx.reply(this.getMessage(ctx), {
        parse_mode: 'HTML',
      });
      await ctx.conversation.enter(CONVERSATIONS.order);

    } catch (error) {

      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    
    }
    
  }

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

}
