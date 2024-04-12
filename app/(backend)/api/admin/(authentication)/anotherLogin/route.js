import { connectToDatabase } from "components/lib/mongodb"
import User from "components/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        await connectToDatabase()

        let data = await request.json()

        const { profile, account } = data

        const userDetail = {
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email.toLowerCase(),
            password: "",
            loginType: account.provider,
            token: account.access_token
        }

        const user = await User.find({ email: profile.email.toLowerCase() });

        if (user.length > 0) {

            const userUpdate = await User.findByIdAndUpdate({ _id: user[0]._id }, { $set: { ...userDetail } })

        } else {

            let userObj = new User(userDetail)

            await userObj.save()

        }

        return NextResponse.json({ data, status: 200, msg: "Login Successfully", error: false, notificationFlag: false }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ data: 'Something Went Wrong................!', status: 500, msg: "", error: true, notificationFlag: false }, { status: 500 })
    }
}