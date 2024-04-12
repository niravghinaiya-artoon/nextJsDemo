
import { connectToDatabase } from "components/lib/mongodb";
import User, { schema } from "components/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request) {

    try {

        await connectToDatabase()

        const data = await request.json()

        const { error } = schema.validate(data);

        if (!!error) {
            return NextResponse.json({ data: error?.details?.[0]?.message, status: 400, error: true, notificationFlag: true }, { status: 400 })
        }

        const user = await User.find({ email: data.email.toLowerCase() });

        if (user.length > 0) {
            return NextResponse.json({ data, status: 400, msg: "Email already exit.", error: true, notificationFlag: true }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        let userObj = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            password: hashPassword,
            email: data.email.toLowerCase(),
        })

        await userObj.save()

        return NextResponse.json({ data, status: 200, msg: "Signup Successfully", error: false, notificationFlag: false }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ data: 'Something Went Wrong................!', status: 500, msg: "", error: true, notificationFlag: false }, { status: 500 })
    }

}
