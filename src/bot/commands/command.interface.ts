import { MyContext } from '../types';

export interface ICommand {
  execute(ctx: MyContext): Promise<void>;
}
