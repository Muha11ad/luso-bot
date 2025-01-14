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
      await ctx.reply(`Error: ${res.message}`);
      return;
    } else if (res.length === 0) {
      await ctx.reply(ctx.t('no_recommended_products'));
      return;
    }
    const imageLink =
      'https://cdn.olcha.uz/image/700x700/products/2022-09-03/deoproce-h2o-krem-pitatelnyi-100-gr-ut-00005233g1h6e-113771-0.jpeg';
    for (const product of res) {
      await ctx.replyWithPhoto(imageLink, {
        caption: this.getCaption(product, ctx),
        parse_mode: 'HTML',
      });
    }
  }
}
