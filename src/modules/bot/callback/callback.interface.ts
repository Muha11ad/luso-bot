import { MyContext } from '@/shared/types';

export interface ICallback {

  handle(ctx: MyContext): Promise<void>;

}
