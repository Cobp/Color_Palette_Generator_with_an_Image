import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user"
import bcypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials, req) {
                await connectDB()
                console.log(credentials);

                const userFound = await User.findOne({ email: credentials?.email }).select("+password");
                if (!userFound) throw new Error("Invalid credentials");

                const passwordMatch = await bcypt.compare(credentials!.password, userFound.password)

                if (!passwordMatch) throw new Error("Invalid password");

                console.log(passwordMatch);


                return userFound;
            }
        })
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user;
            console.log(token);
            return token;
        },
        session({ session, token }) {
            session.user = token.user as any;
            return session;
        }
    },
    pages: {
        signIn: "/login"
    }
})

export { handler as GET, handler as POST }