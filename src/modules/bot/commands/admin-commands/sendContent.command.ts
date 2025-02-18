import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { COMMANDS, CONVERSATIONS } from "@/shared/utils/consts";
import { ICommand } from "../command.interface";
import { MyContext } from "@/shared/utils/types";
import { handleBotError } from "@/shared/utils/helpers";
import { Bot } from "grammy";
import { UserHttpService } from "@/modules/api/services/user.http.service";

@Injectable()
export class SendContentCommand implements ICommand {

    constructor(
        private readonly userService: UserHttpService
    ) { }

    public async execute(ctx: MyContext): Promise<void> {

        try {

            await ctx.conversation.enter(CONVERSATIONS.sendContent, this.userService);

        } catch (error) {

            return handleBotError(error, COMMANDS.SEND_CONTENT, ctx);

        }
    }
}