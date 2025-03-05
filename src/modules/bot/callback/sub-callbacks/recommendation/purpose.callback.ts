import { Injectable, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TG_CONFIG } from "@/configs/tg.config";
import { ICallback } from "../../callback.interface";
import { IProduct, MyContext } from "@/shared/utils/types";
import { RecommenadionHttpService } from "@/modules/http/services/recommendation.http.service";
import { addThousandSeparator, deletePrevMessage, handleBotError } from "@/shared/utils/helpers";
import { RecommendationCreateClientReq, RecommendationSaveReq } from "@/modules/http/http.types";

@Injectable()
export class PurposeCallback implements ICallback {

    constructor(
        private readonly configService: ConfigService,
        private readonly recommendationHttpService: RecommenadionHttpService,
    ) { }

    public async handle(ctx: MyContext): Promise<void> {
        try {
            const callbackQuery = ctx.callbackQuery;
            const purpose = callbackQuery.data.split('_')[1];
            ctx.session.rec = { ...ctx.session.rec, purpose };

            await deletePrevMessage(ctx);

            const data: RecommendationCreateClientReq = {
                age: ctx.session.rec.age,
                skinType: ctx.session.rec.skinType,
                purpose,
            }

            const recommendation = await this.recommendationHttpService.getRecommendedProducts(data);

            if (!recommendation.success) {
                await ctx.reply(ctx.t('server_error'));
                return;
            }

            if (recommendation?.data?.length === 0) {
                await ctx.reply(ctx.t('no_recommended_products'));
            } else if (recommendation?.data?.length > 0) {
                await this.renderProducts(ctx, recommendation.data);
            }

            const usersData: RecommendationSaveReq = {
                purpose,
                age: ctx.session.rec.age,
                userId: String(ctx.from.id),
                skin_type: ctx.session.rec.skinType,
                products: recommendation?.data.map((product) => product.id) || [],
            };

            await this.recommendationHttpService.saveRecommendation(usersData);
            return;
        } catch (error) {
            return handleBotError(error, PurposeCallback.name, ctx);
        }
    }

    private async renderProducts(ctx: MyContext, products: IProduct[]): Promise<void> {
        const webAppUrl = this.configService.get(TG_CONFIG.webApp);

        for (const product of products) {
            const caption = this.getCaption(product, ctx);

            if (product?.Images?.length > 0) {
                await ctx.replyWithPhoto(product.Images[0].imageUrl, {
                    caption,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [[{ text: 'See full product', url: webAppUrl }]],
                    },
                });
            } else {
                await ctx.reply(caption, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [[{ text: 'See full product', url: webAppUrl }]],
                    },
                });
            }
        }
    }

    private getCaption(product: IProduct, ctx: MyContext): string {
        const locale = ctx.i18n.locale();
        const purposeTranslation = product?.Characteristic?.purpose?.[locale] || '';

        return `
        <b>${ctx.t('name')}</b> ${product.name}\n<b>${ctx.t('price')}</b> ${addThousandSeparator(product.price)}\n<b>${ctx.t('description')}</b>${purposeTranslation}
        `;
    }
}