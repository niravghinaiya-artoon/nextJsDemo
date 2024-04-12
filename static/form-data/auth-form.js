import { commonMessageSchema, emailSchema, passwordSchema } from "./pattern";

export const authSchema = {
    email: emailSchema,
    password: commonMessageSchema("Please enter a password"),
};

export const authLoginSchema = {
    firstName: commonMessageSchema("Please enter a first name"),
    lastName: commonMessageSchema("Please enter a last name"),
    email: emailSchema,
    password: passwordSchema()
};