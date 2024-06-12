import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Invalid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    role: { type: String },
    image: { type: String },
    githubId: { type: String },
},{
    timestamps: true,
    versionKey: false
});

const User = models.User || model("User", userSchema);
export default User;