import mongoose from "mongoose";
import { UserSchema } from "./user.js";

export const ownerSchema = new mongoose.Schema({
    accountNumber: {
        required: true,
        type: String
    },
    bankCode: {
        required: true,
        type: String
    },
    zelleId: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: UserSchema
    }
}, 
{toJSON: {
    transform(doc, ret) {
        delete ret._id; // Exclude _id from the response
        return ret;
        }
    },
toObject: {
    transform(doc, ret) {
        delete ret._id; // Exclude _id from the response
        return ret;
        }
    }
});

const OwnerModel = mongoose.model('Owner', ownerSchema);
export default OwnerModel;