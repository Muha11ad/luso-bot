export const COMMANDS = {
    APP: 'app',
    HELP: 'help',
    START: 'start',
    LANGUAGE: 'language',
    SEND_CONTENT: 'send_content',
    RECOMMENDATION: 'recommendation',

}

export const ENDPOINTS = {
    LOGIN: 'admin/auth/login',
    CREAET_USER: 'landing/user',
    REFRESH: 'admin/auth/refresh',
    GET_ALL_USERS: 'admin/user/all',
    RECOMMENDATION_SAVE: 'admin/recommendation',
    RECOMMENDATION_GET: 'landing/product/filter',
};

export const LANGUAGE_KEYBOARDS = [
    { text: 'English 🇬🇧', callback_data: 'lang_en' },
    { text: 'Русский 🇷🇺', callback_data: 'lang_ru' },
    { text: "O'zbekcha 🇺🇿", callback_data: 'lang_uz' },
];

export const START_LANGUAGE_KEYBOARDS = [
    { text: 'English 🇬🇧', callback_data: 'start_en' },
    { text: 'Русский 🇷🇺', callback_data: 'start_ru' },
    { text: "O'zbekcha 🇺🇿", callback_data: 'start_uz' },
];

export const AGES = ['16+', '18+', '25+', '35+', '45+'];

export const AGES_WITH_CALLBACK = AGES.map((age) => ({
    text: age,
    callback_data: `age_${age}`,
}));

export const SKIN_TYPES = ['Dry', 'Oily', 'Sensetive', 'Combination'];

export const SKIN_TYPES_WITH_CALLBACK = SKIN_TYPES.map((skinType) => ({
    text: skinType,
    callback_data: `skin_${skinType}`,
}));

export const PURPOSES = ['Acne', 'Anti-Aging', 'Brightening', 'Hydrating', 'Pore-Care', 'Whitening'];

export const PURPOSES_WITH_CALLBACK = PURPOSES.map((purpose) => ({
    text: purpose,
    callback_data: `purpose_${purpose}`,
}));

export const CALLBACK = {
    CANCEL_ORDER: 'cancel_order',
    CONFIRM_ORDER: 'confirm_order',
    LANGUAGE: ['lang_uz', 'lang_ru', 'lang_en'],
    START: ['start_uz', 'start_ru', 'start_en'],
    AGE: AGES_WITH_CALLBACK.map((value) => value.callback_data),
    PURPOSE: PURPOSES_WITH_CALLBACK.map((value) => value.callback_data),
    SKIN_TYPE: SKIN_TYPES_WITH_CALLBACK.map((value) => value.callback_data),
};

export const CONVERSATIONS = {
    order: 'confirmOrderConversation',
    sendContent: 'sendContentConversation',
}

export const REDIS_KEYS = {
    access: 'access',
    refresh: 'refresh',
}
