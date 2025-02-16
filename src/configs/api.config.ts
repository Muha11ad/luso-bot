import { registerAs } from "@nestjs/config";

export default registerAs("api", () => ({

    baseUrl: process.env.API_BASE_URL,
    origin: process.env.API_ORIGIN,
    
}));