import { Injectable } from '@nestjs/common';
import { ICommand } from './command.interface';
import { getLanguageMessage } from '../utils/messages/language';
import { InlineKeyboard } from 'grammy';

const inlineKeyboard = new InlineKeyboard([
  [{ text: 'English 🇬🇧', callback_data: 'en' }],
  [{ text: 'Русский 🇷🇺', callback_data: 'ru' }],
  [{ text: "O'zbekcha 🇺🇿", callback_data: 'uz' }],
]);
@Injectable()
export class LanguageCommand implements ICommand {
  async execute(ctx): Promise<void> {
    await ctx.reply(getLanguageMessage(ctx), {
      reply_markup: inlineKeyboard,
      parse_mode: 'HTML',
    });
  }
}
