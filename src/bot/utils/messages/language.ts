import { InlineKeyboard } from 'grammy';

export const chooseLanguage = `
English ${'🇬🇧'}
Русский ${'🇷🇺'}
O'zbekcha ${'🇺🇿'}
`;

export function getLanguageMessage(ctx): string {
  const choose_language = ctx.t('choose_language');
  return `
  <strong>${choose_language} : </strong>
  `;
}
