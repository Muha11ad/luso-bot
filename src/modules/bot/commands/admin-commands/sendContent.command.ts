import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { COMMANDS, CONVERSATIONS } from "@/shared/utils/consts";
import { ICommand } from "../command.interface";
import { MyContext } from "@/shared/utils/types";
import { handleBotError } from "@/shared/utils/helpers";
import { Bot } from "grammy";

@Injectable()
export class SendContentCommand implements ICommand {

    constructor(
        private readonly configService: ConfigService
    ) { }

    public async execute(ctx: MyContext): Promise<void> {

        try {

            await ctx.conversation.enter(CONVERSATIONS.sendContent);

        } catch (error) {
            return handleBotError(error, COMMANDS.SEND_CONTENT, ctx);
        }
    }
}