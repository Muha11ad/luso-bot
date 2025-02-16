import { I18nFlavor } from '@grammyjs/i18n';
import { SessionData } from './session.type';
import { EmojiFlavor } from '@grammyjs/emoji';
import { Context, SessionFlavor } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

export type MyContext =
  Context &
  SessionFlavor<SessionData> &
  I18nFlavor &
  EmojiFlavor<Context> &
  ConversationFlavor;
