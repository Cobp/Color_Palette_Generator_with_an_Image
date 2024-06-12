import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb"
import bcrypt from "bcryptjs"


export async function POST(request: Request) {
    const { name, email, password, role } = await request.json()
    console.log(name, email, password, role)

    if (!password || password.length < 6)
        return NextResponse.json({
            message: "Password must be at least 6 characters"
        }, {
            status: 400
        })

    try {
        // throw new Error("Invalid!!!");
        await connectDB()
        const userFound = await User.findOne({ email })

        if (userFound)
            return NextResponse.json({
                message: "Email already exists"
            }, {
                status: 409
            })

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        });

        const savedUser = await user.save();

        return NextResponse.json({
            message: "User created successfully",
            user: savedUser.name,
            email: savedUser.email,
            _id: savedUser._id
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            }, {
                status: 400,
            });
        }
    }
}