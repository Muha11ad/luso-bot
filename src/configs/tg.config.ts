import { registerAs } from "@nestjs/config";

export default registerAs("tg", () => ({

    cartDetails: process.env.CART_DETAILS,
    adminId: process.env.ADMIN_TELEGRAM_ID,
    webApp: process.env.TELEGRAM_WEB_APP_URL,
    botToken: process.env.TELEGRAM_BOT_TOKEN 

}))

