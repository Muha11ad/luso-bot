import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICommand } from '../command.interface';
import { MyContext } from '@/shared/utils/types';
import { COMMANDS } from '@/shared/utils/consts';
import { deletePrevMessage, handleBotError } from '@/shared/utils/helpers';

@Injectable()
export class AppCommand implements ICommand {

    constructor(private readonly configService: ConfigService) { }

    public async execute(ctx: MyContext): Promise<void> {

        try {

            await deletePrevMessage(ctx);
            
            const webAppUrl = this.configService.get<string>('tg.webApp');
            
            await ctx.reply('Click the button below to open the mini app:', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Open Mini App',
                                url: webAppUrl ,
                            },
                        ],
                    ],
                },
            });

        } catch (error) {

            return handleBotError(error, COMMANDS.APP, ctx);

        }
    }



}
