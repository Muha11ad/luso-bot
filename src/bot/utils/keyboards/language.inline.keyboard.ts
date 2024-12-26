import { InlineKeyboard } from 'grammy';

export const languageInlineKeyboards = new InlineKeyboard([
  [{ text: 'English 🇬🇧', callback_data: 'en' }],
  [{ text: 'Русский 🇷🇺', callback_data: 'ru' }],
  [{ text: "O'zbekcha 🇺🇿", callback_data: 'uz' }],
]);

export function filteredLanguageInlineKeyboards(language: string): InlineKeyboard {
  return new InlineKeyboard(
    languageInlineKeyboards.inline_keyboard.filter((row: any) => row[0].callback_data != language),
  );
}
