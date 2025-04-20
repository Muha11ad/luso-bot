import { ConfigService } from "@nestjs/config";
import { MyContext } from "@/shared/utils/types";
import { Injectable, Logger } from "@nestjs/common";
import { CONVERSATIONS } from "@/shared/utils/consts";
import { Conversation } from "@grammyjs/conversations";
import { handleBotError } from "@/shared/utils/helpers";
import { IConversation } from "../conversation.interface";
import { UserHttpService } from "@/modules/http/services/user.http.service";

@Injectable()
export class SendContentConversation implements IConversation {
    private adminId: number;
    private readonly logger: Logger;

    constructor(
        private readonly configService: ConfigService,
        private readonly userHttpService: UserHttpService,
    ) {
        this.adminId = Number(this.configService.get('tg.adminId'));
        this.logger = new Logger(SendContentConversation.name);
    }

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async handle(conversation: Conversation<MyContext>, ctx: MyContext) {

        try {
        
            if (ctx.message.from.id !== this.adminId) {
                await ctx.reply('Saloomaat 🫡');
                return;
            }

            await ctx.reply('Send a message (text, image, poll, etc.), and I will send it to all users.');

            const result = await conversation.waitFor('message');
            const messageId = result.message.message_id;

            const users = await this.userHttpService.getAllUsers();

            const BATCH_SIZE = 30;
            const DELAY_BETWEEN_BATCHES = 2000;

            let successCount = 0;
            let failCount = 0;

            for (let i = 0; i < users.length; i += BATCH_SIZE) {

                const batch = users.slice(i, i + BATCH_SIZE);

                await Promise.allSettled(

                    batch.map(async (user) => {

                        try {
                        
                            await ctx.api.copyMessage(user.telegram_id, this.adminId, messageId);
                        
                            successCount++;
                        } catch (error) {
                        
                            failCount++;
                            console.error(`❌ Failed to send to ${user.telegram_id}: ${error.message}`);
                        
                        }
                    
                    })
                
                );

                await this.delay(DELAY_BETWEEN_BATCHES);
            }

            await ctx.reply(`🟢 Message delivery completed!\n\n✅ From: ${users.length} \n Sent: ${successCount}\n❌ Failed: ${failCount}`);

        } catch (error) {

            return handleBotError(error, CONVERSATIONS.sendContent, ctx);
        
        }
    
    }

}
