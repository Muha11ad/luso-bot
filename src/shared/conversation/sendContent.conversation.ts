import { MyContext } from '../utils/types';
import { handleBotError } from '../utils/helpers';
import { Conversation } from '@grammyjs/conversations';

const adminId = 7134231329; // Define adminId

export async function sendContentConversation(conversation: Conversation<MyContext>, ctx: MyContext, userService: UserHttpService): Promise<void> {

    try {

        if (ctx.message.from.id !== Number(adminId)) {
            await ctx.reply('Saloomaat 🫡');
            return;
        }

        await ctx.reply('Hello narsa tasha, boshqalaga yuborama 🫠');

        const result = await conversation.waitFor('message');

        // Send the received message to all users

        const users = await userService.getAllUsers();

        for (const user of users) {
            try {
                await ctx.api.forwardMessage(user, adminId, result.msgId);
            } catch (error) {
                console.error(`Failed to send message to ${user}:`, error);
            }
        }

        return
    } catch (error) {

        return handleBotError(error, 'order', ctx);

    }
}
