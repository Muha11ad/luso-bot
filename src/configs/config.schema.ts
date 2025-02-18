import * as Joi from "joi";

export const configSchema = Joi.object({
    
    APP_MODE: Joi.string().valid('dev', 'prod', 'test'),
    APP_PORT: Joi.number(),

    ADMIN_TELEGRAM_ID: Joi.number(),

    API_BASE_URL: Joi.string(),
    API_ORIGIN: Joi.string(),

    CART_DETAILS: Joi.string(),

    TELEGRAM_BOT_TOKEN: Joi.string(),
    TELEGRAM_WEB_APP_URL: Joi.string(),

    ADMIN_EMAIL: Joi.string(),
    ADMIN_PASSWORD: Joi.string(),

}).options({ presence: "required" });