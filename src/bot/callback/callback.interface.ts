import { MyContext } from '@/bot/types';

export interface ICallback {
  handle(ctx: MyContext): Promise<void>;
}
