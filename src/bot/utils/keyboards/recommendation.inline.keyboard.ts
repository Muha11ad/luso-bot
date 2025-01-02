import { CALLBACK } from '@/bot/types';
import { InlineKeyboard } from 'grammy';

export function getAgeKeyboard() {
  return new InlineKeyboard()
    .text('15-19', CALLBACK.AGE)
    .text('20-30', CALLBACK.AGE)
    .text('30-40', CALLBACK.AGE)
    .text('40+', CALLBACK.AGE);
}
export function getSkinTypeKeyboard() {
  return new InlineKeyboard().text('Oil', CALLBACK.SKIN_TYPE).text('Dry', CALLBACK.SKIN_TYPE);
}
