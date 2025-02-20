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
    private readonly confirmOrderConversation: OrderConversation,
    private readonly sendContentConversation: SendContentConversation
  ) { }

  public registerConversations(bot: Bot<MyContext>) {

    bot.use(createConversation(this.confirmOrderConversation.handle.bind(this.confirmOrderConversation), CONVERSATIONS.order));
    bot.use(createConversation(this.sendContentConversation.handle.bind(this.sendContentConversation), CONVERSATIONS.sendContent));
  }

}