import { Context } from 'grammy';

export interface ICommand {
  execute(ctx: Context): Promise<void>;
}
