import { ApiService } from '@/modules/api';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICallback } from '../../callback.interface';
import { IProduct, MyContext } from '@/shared/utils/types';
import { RecommendationCreateClientReq } from '@/modules/api/api.types';
import { addThousandSeparator, deletePrevMessage, handleBotError } from '@/shared/utils/helpers';



@Injectable()
export class PurposeCallback implements ICallback {

  constructor(
    private readonly apiService: ApiService,
    private readonly configService: ConfigService,
  ) { }

  public async handle(ctx: MyContext): Promise<void> {

    try {

      await deletePrevMessage(ctx);

      const callbackQuery = ctx.callbackQuery;
      const purpose = callbackQuery.data.split('_')[1];

      ctx.session.rec = { ...ctx.session.rec, purpose };

      if (!ctx.session.rec.age && !ctx.session.rec.purpose && !ctx.session.rec.skinType) {

        await ctx.reply(ctx.t('recommendation_error'));

      }

      const data: RecommendationCreateClientReq = {
        age: ctx.session.rec.age,
        skinType: ctx.session.rec.skinType,
        purpose: ctx.session.rec.purpose,
      }

      console.log(data);

      const response = await this.apiService.getRecommendedProducts(data);

      if (!response.success) {

        await ctx.reply(ctx.t('server_error'));
        return

      }

      if (response.data.length === 0) {

        await ctx.reply(ctx.t('no_recommended_products'));
        return;

      }

      await this.renderProducts(ctx, response.data);

    } catch (error) {

      return handleBotError(error, PurposeCallback.name, ctx);

    }

  }

  private async renderProducts(ctx: MyContext, products: IProduct[]) {

    const webAppUrl = this.configService.get('tg.webApp');

    for (const product of products) {

      if (product?.Images && product.Images.length > 0) {

        await ctx.replyWithPhoto(product?.Images[0]?.imageUrl, {
          caption: this.getCaption(product, ctx),
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'See full product',
                  url: webAppUrl,
                },
              ],
            ],
          },
        });

      } else {

        await ctx.reply(this.getCaption(product, ctx), {
          parse_mode: 'HTML',
        });

      }
    }

  }

  private getCaption(product: IProduct, ctx: MyContext): string {

    return `
    <b>${ctx.t('name')}</b> ${product.name}\n<b>${ctx.t('price')}</b> ${addThousandSeparator(product.price)}\n<b>${ctx.t('description')}</b> ${product?.Characteristic?.purpose?.ru}\n<u>${ctx.t('find_product')}</u>
    `;

  }

}
