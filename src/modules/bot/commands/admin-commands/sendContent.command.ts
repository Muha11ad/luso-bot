import { Injectable } from "@nestjs/common";
import { ICommand } from "../command.interface";
import { MyContext } from "@/shared/utils/types";
import { handleBotError } from "@/shared/utils/helpers";
import { COMMANDS, CONVERSATIONS } from "@/shared/utils/consts";

@Injectable()
export class SendContentCommand implements ICommand {

    constructor(
    ) { }

    public async execute(ctx: MyContext): Promise<void> {

        try {

            await ctx.conversation.enter(CONVERSATIONS.sendContent);

        } catch (error) {

            return handleBotError(error, COMMANDS.SEND_CONTENT, ctx);

        }
    }
}