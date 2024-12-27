import { InlineKeyboard } from 'grammy';

export const startLanguageInlineKeyboards = new InlineKeyboard([
  [{ text: 'English 🇬🇧', callback_data: 'start_en' }],
  [{ text: 'Русский 🇷🇺', callback_data: 'start_ru' }],
  [{ text: "O'zbekcha 🇺🇿", callback_data: 'start_uz' }],
]);
export const languageInlineKeyboards = new InlineKeyboard([
  [{ text: 'English 🇬🇧', callback_data: 'lang_en' }],
  [{ text: 'Русский 🇷🇺', callback_data: 'lang_ru' }],
  [{ text: "O'zbekcha 🇺🇿", callback_data: 'lang_uz' }],
]);

export function filteredLanguageInlineKeyboards(language: string): InlineKeyboard {
  return new InlineKeyboard(
    languageInlineKeyboards.inline_keyboard.filter((row: any) => row[0].callback_data != language),
  );
}
