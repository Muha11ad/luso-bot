import { Injectable, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TG_CONFIG } from "@/configs/tg.config";
import { MyContext } from "@/shared/utils/types";
import { ICallback } from "../../callback.interface";
import { RecommendationCreateReq } from "@/modules/http/http.types";
import { deletePrevMessage, handleBotError } from "@/shared/utils/helpers";
import { RecommenadionHttpService } from "@/modules/http/services/recommendation.http.service";

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

            const data: RecommendationCreateReq = {
                purpose,
                age: ctx.session.rec.age,
                userId: String(ctx.from.id),
                skinType: ctx.session.rec.skinType,
                userLang: await this.formatLanguage(ctx),
            }

            const recommendation = await this.recommendationHttpService.generate(data);

            if (!recommendation.success) {

                await ctx.reply(ctx.t('server_error'));
                return;

            }

            const webAppUrl = this.configService.get(TG_CONFIG.webApp)

            await ctx.reply(recommendation.data, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [[{ text: ctx.t('see_products'), url: webAppUrl }]],
                },
            })

            return;
            
        } catch (error) {
            return handleBotError(error, PurposeCallback.name, ctx);
        }
    }

    private async formatLanguage(ctx: MyContext): Promise<string> {

        const userLang = ctx.session.__language_code;

        switch (userLang) {
            case 'ru':
                return 'Russian';
            case 'uz':
                return 'Uzbek tilida';
            case 'en':
                return 'English';
            default:
                return 'English';
        }

    }

}