import { MyContext } from "@/shared/utils/types";

export interface ICommand {

  execute(ctx: MyContext): Promise<void>;

}
