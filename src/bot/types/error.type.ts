import { MyContext } from './context.type';
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

export interface MyBotError extends Error {
  error: GrammyError;
  ctx: MyContext;
  name: 'BotError';
}
