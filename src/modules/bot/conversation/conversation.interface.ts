import { MyContext } from "@/shared/utils/types";
import { Conversation } from "@grammyjs/conversations";

export interface IConversation {

    handle(conversation: Conversation<MyContext>, ctx: MyContext): Promise<void>;

}