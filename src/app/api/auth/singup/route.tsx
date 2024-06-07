import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb"
import bcrypt from "bcryptjs"


export async function POST(request: Request) {
    const { firstname, lastname, email, password } = await request.json()
    console.log(firstname, lastname, email, password)

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
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        return NextResponse.json({
            message: "User created successfully",
            user: savedUser.firstname,
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