import Joi from 'joi';
import mongoose from 'mongoose';

const userSignup = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isDelete: { type: Boolean, default: false },
    token: { type: String, default: "" },
    loginType: { type: String, default: "" }
})

const User = mongoose.models.user || mongoose.model("user", userSignup)

export const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required(),
    password: Joi.string().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required(),
    password: Joi.string().required(),
    loginType: Joi.string().required(),
});


export default User