import { Module } from "@nestjs/common";
import { ApiModule } from "./api";
import { BotModule } from "./bot/bot.module";
import { ConfigModule } from "@nestjs/config";
import { configSchema } from "@/configs/config.schema";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [],
            validationSchema: configSchema
        }),
        BotModule,
        ApiModule],
})
export class AppModule { }