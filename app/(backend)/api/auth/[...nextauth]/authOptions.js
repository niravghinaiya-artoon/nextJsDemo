import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

const EXPIRY_TIME = 30 * 24 * 60 * 60 // 30 days

export const authOptions = {
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials) {
                    throw new Error("No credentials.");
                }
                return credentials;

            },
        }),
    ],

    pages: {
        signIn: "/login"
    },

    callbacks: {
        async jwt(data) {
            const { token, user } = data;

            if (data?.account?.provider === "google") {
                user.token = data.account.access_token
            }

            if (user) {
                token.role = user.role;
            }

            return { ...token, ...user };
        },

        session({ session, token }) {

            if (token && session.user) {
                session.user = { ...session.user, ...token }
            }

            return session;

        },

        async signIn(user) {

            if (user.account.provider === "google") {

                try {
                    const request = { ...user }

                    const data = await axios.post("http://localhost:8001/api/admin/anotherLogin", request);

                } catch (error) { console.log('error', error) }

            }

            return user;
        }
    },

    jwt: {
        maxAge: EXPIRY_TIME
    },
    session: {
        jwt: true,
        maxAge: EXPIRY_TIME
    },
}