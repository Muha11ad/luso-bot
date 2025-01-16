import { ApiService } from '@/api';
import { Injectable } from '@nestjs/common';
import { ENDPOINTS } from '@/bot/utils/consts';
import { IProduct, MyContext } from '@/bot/types';
import { ICallback } from '../../callback.interface';
import { addThousandSeparator, deletePrevMessage } from '@/bot/utils/helpers';

@Injectable()
export class SkinTypeCallback implements ICallback {
  constructor(private readonly apiService: ApiService) {}
  private getCaption(product: IProduct, ctx: MyContext): string {
    return `
    <b>${ctx.t('name')}</b> ${product.name}\n<b>${ctx.t('price')}</b> ${addThousandSeparator(product.price)}\n<b>${ctx.t('description')}</b> ${product?.Characteristic?.purpose?.ru}\n<u>${ctx.t('find_product')}</u>
    `;
  }
  async handle(ctx: MyContext): Promise<void> {
    try {
      const callbackQuery = ctx.callbackQuery;
      const skin_type = callbackQuery.data.split('_')[1];

      ctx.session.rec = { ...ctx.session.rec, skin_type };

      await deletePrevMessage(ctx);
      if (!ctx.session.rec.age && !ctx.session.rec.skin_type) {
        await ctx.reply(ctx.t('recommendation_error'));
      }
      const res = await this.apiService.postData<IProduct[], { age: string; skin_type: string }>(
        ENDPOINTS.RECOMMENDATION,
        ctx.session.rec as { age: string; skin_type: string },
      );
      if ('error' in res) {
        await ctx.reply(`Error: ${ctx.t('server_error')}`);
        return;
      } else if (res.length === 0) {
        await ctx.reply(ctx.t('no_recommended_products'));
        return;
      }
      for (const product of res) {
        await ctx.replyWithPhoto(product?.Images[0].imageUrl, {
          caption: this.getCaption(product, ctx),
          parse_mode: 'HTML',
        });
      }
    } catch (error) {
      console.log(error);
      await ctx.answerCallbackQuery({ text: ctx.t('server_error') });
    }
  }
}
