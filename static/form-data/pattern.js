import { z } from "components/lib/npm";

export const emailPattern = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?$@&#%]).{10,40}$/;

export const commonMessageSchema = (message) => z
    .string()
    .min(1, { message })

export const emailSchema = z
    .string()
    .min(1, { message: "Please enter your email" })
    .refine((data) => emailPattern.test(data), {
        message: "Please enter a valid email address",
    })

export const passwordSchema = (requiredMsg = "Please enter your password", refineMsg = "Your password does not meet the requirements. Please try again") => z
    .string()
    .min(1, { message: requiredMsg })
    .regex(
        passwordPattern,
        refineMsg
    )

export const optionalCheckMarkSchema = z.boolean().optional();