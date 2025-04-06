import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MyContext } from "@/shared/utils/types";
import { CONVERSATIONS } from "@/shared/utils/consts";
import { Conversation } from "@grammyjs/conversations";
import { handleBotError } from "@/shared/utils/helpers";
import { IConversation } from "../conversation.interface";
import { UserHttpService } from "@/modules/http/services/user.http.service";

@Injectable()
export class SendContentConversation implements IConversation {

    private adminId: number;
    private readonly logger: Logger

    constructor(
        private readonly configService: ConfigService,
        private readonly userHttpService: UserHttpService,
    ) {
        this.adminId = Number(this.configService.get('tg.adminId'));
        this.logger = new Logger(SendContentConversation.name)
    }

    public async handle(conversation: Conversation<MyContext>, ctx: MyContext) {
        try {
            if (ctx.message.from.id !== this.adminId) {
                await ctx.reply('Saloomaat 🫡');
                return;
            }

            await ctx.reply('Send a message (text, image, poll, etc.), and I will send it to all users.');

            // Wait for the admin's message
            const result = await conversation.waitFor('message');
            const messageId = result.message.message_id; // Get message ID

            const users = await this.userHttpService.getAllUsers();

            for (const user of users) {
                
                try {
                    // Copy the message (removes "Forwarded from" label)
                    await ctx.api.copyMessage(user.telegram_id, this.adminId, messageId);
                
                } catch (error) {

                    this.logger.error(`Failed to send message to user ${user.telegram_id}: ${error.message}`);
                
                }
            
            }

            await ctx.reply('Message has been sent to all users 🫡');
        
        } catch (error) {
        
            return handleBotError(error, CONVERSATIONS.sendContent, ctx);
        
        }
    }
}
