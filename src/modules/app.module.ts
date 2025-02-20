import { HttpModule } from "./http";
import { Module } from "@nestjs/common";
import tgConfig from "@/configs/tg.config";
import { BotModule } from "./bot/bot.module";
import appConfig from "@/configs/app.config";
import apiConfig from "@/configs/api.config";
import { ConfigModule } from "@nestjs/config";
import { configSchema } from "@/configs/config.schema";
import { Cache, CacheModule } from "@nestjs/cache-manager";
import adminConfig from "@/configs/admin.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                tgConfig,
                apiConfig,
                appConfig,
                adminConfig,
            ],
            validationSchema: configSchema
        }),
        CacheModule.register({isGlobal: true}),
        BotModule,
        HttpModule
    ],
})
export class AppModule { }