import { connectToDatabase } from "components/lib/mongodb";
import User, { loginSchema } from "components/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export async function POST(request) {

    try {
        await connectToDatabase()

        let data = await request.json()

        const { error } = loginSchema.validate(data);

        if (!!error) {
            return NextResponse.json({ data: error?.details?.[0]?.message, status: 400, error: true, notificationFlag: true }, { status: 400 })
        }

        const user = await User.find({ email: data.email.toLowerCase() });

        if (user.length === 0) {
            return NextResponse.json({ data, status: 400, msg: "User is not Found.", error: true, notificationFlag: true }, { status: 400 })
        }

        if (user.length > 0) {
            const isMatch = await bcrypt.compare(data.password, user[0].password);

            if (!isMatch) {
                return NextResponse.json({ data, status: 400, msg: "This email address and password combination does not match. Please try again.", error: true, notificationFlag: true }, { status: 400 })
            }
        }

        const token = jwt.sign({ _id: user._id }, process.env.NODE_JS_SECRETE_KEY, {
            expiresIn: '24h'
        });

        const userUpdate = await User.findByIdAndUpdate({ _id: user[0]._id }, { $set: { loginType: data.loginType } })

        data.token = token;

        return NextResponse.json({ data, status: 200, msg: "Login Successfully", error: false, notificationFlag: false }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ data: 'Something Went Wrong................!', status: 500, msg: "", error: true, notificationFlag: false }, { status: 500 })
    }
}