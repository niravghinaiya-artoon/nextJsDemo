import { EXPIRY_TIME } from "./server";

export const expireTime = () => new Date(Date.now() + (EXPIRY_TIME * 1000)); // Token expiry time