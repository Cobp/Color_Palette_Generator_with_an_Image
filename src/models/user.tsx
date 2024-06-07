import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [3, "First Name must be at least 3 characters"],
        maxLength: [50, "First Name must be less than 50 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name is required"],
        minLength: [3, "First Name must be at least 3 characters"],
        maxLength: [50, "First Name must be less than 50 characters"]
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
});

const User = models.User || model("User", userSchema);
export default User;