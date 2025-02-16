import { ApiModule } from "./api";
import { Module } from "@nestjs/common";
import tgConfig from "@/configs/tg.config";
import { BotModule } from "./bot/bot.module";
import appConfig from "@/configs/app.config";
import apiConfig from "@/configs/api.config";
import { ConfigModule } from "@nestjs/config";
import { configSchema } from "@/configs/config.schema";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                tgConfig,
                appConfig,
                apiConfig
            ],
            validationSchema: configSchema
        }),
        BotModule,
        ApiModule
    ],
})
export class AppModule { }