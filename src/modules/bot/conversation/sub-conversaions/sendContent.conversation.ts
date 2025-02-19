import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MyContext } from "@/shared/utils/types";
import { CONVERSATIONS } from "@/shared/utils/consts";
import { Conversation } from "@grammyjs/conversations";
import { handleBotError } from "@/shared/utils/helpers";
import { IConversation } from "../conversation.interface";
import { UserHttpService } from "@/modules/http/services/user.http.service";

@Injectable()
export class SendContentConversation implements IConversation {

    private adminId: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly userHttpService: UserHttpService,
    ) {

        this.adminId = this.configService.get('tg.adminId');

    }

    public async handle(conversation: Conversation<MyContext>, ctx: MyContext) {

        try {

            if (ctx.message.from.id !== Number(this.adminId)) {

                await ctx.reply('Saloomaat 🫡');
                return;

            }

            await ctx.reply('Hello narsa tasha, boshqalaga yuborama 🫠');

            const result = await conversation.waitFor('message');

            const users = await this.userHttpService.getAllUsers();

            for (const user of users) {

                try {

                    await ctx.api.forwardMessage(user.telegram_id, this.adminId, result.msgId);

                } catch (error) {

                    console.error(`Failed to send message to ${user}:`, error);

                }
            }

            await ctx.reply('Xabar barchaga yetkazildi 🫡');
            return

        } catch (error) {

            return handleBotError(error, CONVERSATIONS.sendContent, ctx);

        }

    }

}





