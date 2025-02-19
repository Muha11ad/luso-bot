import { Bot } from "grammy";
import { Injectable } from "@nestjs/common";
import { MyContext } from "@/shared/utils/types";
import { CONVERSATIONS } from "@/shared/utils/consts";
import { createConversation } from "@grammyjs/conversations";
import { OrderConversation } from "./sub-conversaions/order.conversation";
import { SendContentConversation } from "./sub-conversaions/sendContent.conversation";

@Injectable()
export class ConversationService {
  constructor(
    private readonly order: OrderConversation,
    private readonly sendContent: SendContentConversation
  ) { }

  public registerConversations(bot: Bot<MyContext>) {

    bot.use(createConversation(this.order.handle.bind(this.order, CONVERSATIONS.confirm_order)));
    bot.use(createConversation(this.sendContent.handle.bind(this.sendContent), "sendContentConversation"));

  }

}