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

            const sentMessage = await ctx.reply(ctx.t('generating_process'));

            deletePrevMessage(ctx);

            const data: RecommendationCreateReq = {
                purpose,
                age: ctx.session.rec.age,
                userId: String(ctx.from.id),
                skinType: ctx.session.rec.skinType,
                userLang: this.formatLanguage(ctx),
            }

            const recommendation = await this.recommendationHttpService.generate(data);

            if (!recommendation.success) {

                await ctx.reply(ctx.t('server_error'));
                return;

            }

            const webAppUrl = this.configService.get(TG_CONFIG.webApp)

            await ctx.api.editMessageText(ctx.chat.id, sentMessage.message_id, recommendation?.data, {
                reply_markup: {
                    inline_keyboard: [[{ text: ctx.t('see_products'), url: webAppUrl }]],
                },
                parse_mode: 'HTML',
            })

        } catch (error) {
            return handleBotError(error, PurposeCallback.name, ctx);
        }
    }

    private formatLanguage(ctx: MyContext): string {

        const userLang = ctx.session.__language_code;

        switch (userLang) {
            case 'ru':
                return 'На Русском языке';
            case 'uz':
                return 'Uzbek tilida';
            case 'en':
                return 'In English';
            default:
                return 'English';
        }

    }

}