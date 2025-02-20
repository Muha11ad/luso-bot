import { registerAs } from "@nestjs/config";

export default registerAs('admin', () => ({

    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    cartDetails: process.env.CART_DETAILS,

}))

export const ADMIN_CONFIG = {
    email: 'admin.email',
    password: 'admin.password',
    cartDetails: 'admin.cartDetails',
}
