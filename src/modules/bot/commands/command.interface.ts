import { MyContext } from "@/shared/types";

export interface ICommand {
  execute(ctx: MyContext): Promise<void>;
}
