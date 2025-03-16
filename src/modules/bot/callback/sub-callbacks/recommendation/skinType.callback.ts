import { InlineKeyboard } from 'grammy';
import { Injectable } from '@nestjs/common';
import { MyContext } from '@/shared/utils/types';
import { ICallback } from '../../callback.interface';
import { PURPOSES_WITH_CALLBACK } from '@/shared/utils/consts';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class SkinTypeCallback implements ICallback {

    public async handle(ctx: MyContext): Promise<void> {

        try {

            const callbackQuery = ctx.callbackQuery;
            const skinType = callbackQuery.data.split('_')[1];

            ctx.session.rec = { ...ctx.session.rec, skinType };

            await deletePrevMessage(ctx);

            await ctx.reply(ctx.t('select_purpose'), { reply_markup: this.getPurposeKeyboard(ctx) });

        } catch (error) {

            return handleBotError(error, SkinTypeCallback.name, ctx);

        }
    }

    private getPurposeKeyboard(ctx: MyContext) {
        const keyboard = new InlineKeyboard();
        PURPOSES_WITH_CALLBACK.forEach(({ text, callback_data }, index) => {
            keyboard.text(ctx.t(text), callback_data);
            if ((index + 1) % 3 === 0) {
                keyboard.row(); // Move to the next row after every 3 buttons
            }
        });
        return keyboard;
    }
}