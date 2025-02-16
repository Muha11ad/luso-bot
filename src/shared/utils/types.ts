import { I18nFlavor } from '@grammyjs/i18n';
import { EmojiFlavor } from '@grammyjs/emoji';
import { Context, SessionFlavor } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor & EmojiFlavor<Context> & ConversationFlavor & {
  bot: {
    on: (event: string, callback: (ctx: any) => void) => void;
  };
}

interface GrammyError {
  method: string;
  payload: {
    callback_query_id: string;
    text: string;
  };
  ok: boolean;
  error_code: number;
  description: string;
  parameters: Record<string, unknown>;
}

export interface SessionData {
  step: string;
  __language_code?: string;
  rec?: {
    age?: string;
    skinType?: string;
    purpose?: string;
  };
}

export interface ITranslation {
  uz: string;
  ru: string;
  en: string;
}

export interface MyBotError extends Error {
  error: GrammyError;
  ctx: MyContext;
  name: 'BotError';
}

export interface IImage {
  id: string;
  imageUrl: string;
  product_id: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  Images: IImage[];
  created_at: Date;
  available: boolean;
  category_id: string;
  characteristic_id: string;
  instruction: ITranslation;
  Characteristic: ICharacteristic;
}

export interface ICharacteristic {
  age: string;
  brand: string;
  volume: String;
  product_id: string;
  gender: ITranslation;
  made_in: ITranslation;
  expiration_date: Date;
  caution: ITranslation;
  purpose: ITranslation;
  skin_type: ITranslation;
  ingredients: ITranslation;
  application_time: ITranslation;
}


