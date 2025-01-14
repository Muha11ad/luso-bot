import { AGES_WITH_CALLBACK, SKIN_TYPES_WITH_CALLBACK } from './recommendation.consts';

export const CALLBACK = {
  CANCEL_ORDER: 'cancel_order',
  CONFIRM_ORDER: 'confirm_order',
  LANGUAGE: ['lang_uz', 'lang_ru', 'lang_en'],
  START: ['start_uz', 'start_ru', 'start_en'],
  AGE: AGES_WITH_CALLBACK.map((value) => value.callback_data),
  SKIN_TYPE: SKIN_TYPES_WITH_CALLBACK.map((value) => value.callback_data),
};
