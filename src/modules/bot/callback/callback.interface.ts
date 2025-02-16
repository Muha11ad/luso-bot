import { MyContext } from '@/shared/utils/types';

export interface ICallback {

  handle(ctx: MyContext): Promise<void>;

}
