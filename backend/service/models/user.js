import mongoose from "mongoose"
import commonFields from "./commonFields.js"
import { v4 as uuidv4 } from 'uuid';


export const UserSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        match: /^[a-zA-Z\s]+$/, // Only alphabets and spaces
    },

    lastName: {
        required: true,
        type: String,
        match: /^[a-zA-Z\s]+$/, // Only alphabets and spaces
    },

    userHashId: {
        type: String,
        required: true,
        default: uuidv4
    },

    emailId: {
        required: true,
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email pattern
    },

    mobileNumber: {
        required: true,
        type: String,
        match: /^[0-9]{10}$/, // Only 10 digits
    },

    password: {
        type: String,
        match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    },

    role: {
        type: String,
        enum: ['ADMIN', 'OWNER', 'CUSTOMER'],
    },

    login: {
        type: Boolean,
        default: false
    },

    loginCounts: {
        type: Number,
        default: 0
    },
    ...commonFields
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id; // Exclude _id from the response
                delete ret.password
                return ret;
            }
        },
        toObject: {
            transform(doc, ret) {
                delete ret._id; // Exclude _id from the response
                delete ret.password
                return ret;
            }
        }
    });

const userModel = mongoose.model('user', UserSchema);
export default userModel;