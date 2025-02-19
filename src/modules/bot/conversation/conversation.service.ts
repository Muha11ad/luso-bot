import { Bot } from "grammy";
import { Injectable } from "@nestjs/common";
import { MyContext } from "@/shared/utils/types";
import { conversations, createConversation } from "@grammyjs/conversations";
import { OrderConversation } from "./sub-conversaions/order.conversation";
import { SendContentConversation } from "./sub-conversaions/sendContent.conversation";
import { CONVERSATIONS } from "@/shared/utils/consts";

@Injectable()
export class ConversationService {
  constructor(
    private readonly order: OrderConversation,
    private readonly sendContentConversation: SendContentConversation
  ) { }

  public registerConversations(bot: Bot<MyContext>) {

    bot.use(createConversation(this.order.handle, CONVERSATIONS.order));
    bot.use(createConversation(this.sendContentConversation.handle.bind(this.sendContentConversation), CONVERSATIONS.sendContent));
  }

}