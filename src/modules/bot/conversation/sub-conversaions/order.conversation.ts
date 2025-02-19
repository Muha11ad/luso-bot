import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MyContext } from "@/shared/utils/types";
import { Conversation } from "@grammyjs/conversations";
import { CONVERSATIONS } from "@/shared/utils/consts";
import { handleBotError } from "@/shared/utils/helpers";
import { IConversation } from "../conversation.interface";

@Injectable()
export class OrderConversation implements IConversation {

    private adminId: string;

    constructor(private readonly config: ConfigService) {

        this.adminId = this.config.get('tg.adminId');

    }

    public async handle(conversation: Conversation<MyContext>, ctx: MyContext) {

        try {

            await this.handleImageMessage(conversation, ctx);

            await this.handleLocationMessage(conversation, ctx);

        } catch (error) {

            return handleBotError(error, CONVERSATIONS.confirm_order, ctx);

        }

    }

    private async handleImageMessage(conversation: Conversation<MyContext>, ctx: MyContext) {

        const imageMessage = await conversation.waitFor(':photo', {
            otherwise: (ctx) => ctx.reply(ctx.t('send_only_image')),
        });

        const photo = imageMessage.message.photo[imageMessage.message.photo.length - 1];

        await ctx.api.sendPhoto(this.adminId, photo.file_id, {
            caption: `#${ctx.from.id}`,
        });

        await ctx.reply(ctx.t('send_only_location'));

    }

    private async handleLocationMessage(conversation: Conversation<MyContext>, ctx: MyContext) {

        const locationMessage = await conversation.waitFor(':location', {
            otherwise: (ctx) => ctx.reply(ctx.t('send_only_location')),
        });

        const location = locationMessage.message.location;

        await ctx.api.sendVenue(
            this.adminId,
            location.latitude,
            location.longitude,
            `#${ctx.from.id}`,
            'LOCATION',
        );

        await ctx.reply(ctx.t('conversation_end'));

    }


}