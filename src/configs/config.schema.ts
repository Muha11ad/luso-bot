import Joi from "joi";

export const configSchema = Joi.object({
    
    APP_MODE: Joi.string().valid('dev', 'prod', 'test'),
    APP_PORT: Joi.number(),

    ADMIN_TELEGRAM_ID: Joi.number(),

    API_BASE_URL: Joi.string(),

    CART_DETAILS: Joi.string(),

    TELEGRAM_BOT_TOKEN: Joi.string(),

    ORIGIN: Joi.string(),

}).options({ presence: "required" });