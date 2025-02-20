import { registerAs } from "@nestjs/config";

export default registerAs("tg", () => ({

    adminId: process.env.ADMIN_TELEGRAM_ID,
    webApp: process.env.TELEGRAM_WEB_APP_URL,
    botToken: process.env.TELEGRAM_BOT_TOKEN

}))

export const TG_CONFIG = {
    webApp: 'tg.webApp',
    adminId: 'tg.adminId',
    botToken: 'tg.botToken',
}