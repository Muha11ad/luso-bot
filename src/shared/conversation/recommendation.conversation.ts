import { InlineKeyboard } from 'grammy';
import { MyContext } from "../utils/types";
import { Conversation } from "@grammyjs/conversations";
import { deletePrevMessage, handleBotError } from "../utils/helpers";
import { CALLBACK, SKIN_TYPES_WITH_CALLBACK, PURPOSES_WITH_CALLBACK } from "../utils/consts";


export async function recommendationConversation(conversation: Conversation<MyContext>, ctx: MyContext) {
    
    try {
        // Wait for age 

        const ageResponse = await conversation.waitFor('callback_query:data', async (ctx) => CALLBACK.AGE.includes(ctx.callbackQuery.data));
        console.log(ageResponse);
        const age = ageResponse.callbackQuery.data.split('_')[1];
        ctx.session.rec = { ...ctx.session.rec, age };

        await deletePrevMessage(ctx);

        // Ask for skin type
        await ctx.reply(ctx.t('select_skin_type'), {
            reply_markup: getSkinTypeKeyboard(ctx),
        });

        
        // Wait for skin type 
        const skinTypeResponse = await conversation.waitFor('callback_query:data', async (ctx) => CALLBACK.SKIN_TYPE.includes(ctx.callbackQuery.data));
        const skinType = skinTypeResponse.callbackQuery.data.split('_')[1];
        ctx.session.rec = { ...ctx.session.rec, skinType };
        
        await deletePrevMessage(ctx);
        
        // Ask for purpose
        await ctx.reply(ctx.t('select_purpose'), {
            reply_markup: getPurposeKeyboard(ctx),
        });


    } catch (error) {

        return handleBotError(error, 'recommendation', ctx);

    }

}

function getSkinTypeKeyboard(ctx: MyContext) {

    const keyboard = new InlineKeyboard();

    SKIN_TYPES_WITH_CALLBACK.forEach(({ text, callback_data }) => {
        keyboard.text(ctx.t(text), callback_data);
    });
    return keyboard;

}

function getPurposeKeyboard(ctx: MyContext) {

    const keyboard = new InlineKeyboard();

    PURPOSES_WITH_CALLBACK.forEach(({ text, callback_data }) => {
        keyboard.text(ctx.t(text), callback_data);
    });
    return keyboard;

}