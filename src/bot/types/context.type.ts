import { Context, SessionFlavor } from 'grammy';
import { SessionData } from './session.type';
import { I18nFlavor } from '@grammyjs/i18n';
import { EmojiFlavor } from '@grammyjs/emoji';

export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor & EmojiFlavor<Context>;
