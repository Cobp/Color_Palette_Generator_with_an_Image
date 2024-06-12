import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
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

                const userFound = await User.findOne({ email: credentials?.email }).select("+password");
                if (!userFound) throw new Error("Invalid credentials");

                const passwordMatch = await bcypt.compare(credentials!.password, userFound.password)

                if (!passwordMatch) throw new Error("Invalid password");

                return userFound;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user;
            console.log(token)
            return token;
        },
        session({ session, token }) {
            session.user = token.user as any;
            console.log(session)
            return session;
        }
    },
    pages: {
        signIn: "/login"
    }
})

export { handler as GET, handler as POST }