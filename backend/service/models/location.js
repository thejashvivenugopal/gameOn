import mongoose from "mongoose";
import commonFields from "./commonFields.js";

export const locationSchema = new mongoose.Schema({
    zipCode: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    city: {
        required: true,
        type: String,
    },
    state: {
        required: true,
        type: String,
    },
    addressLineOne: {
        required: true,
        type: String,
    },
    addressLineTwo: {
        required: true,
        type: String,
    },
    locationLink:{
        required: true,
        type:String,

    },
    ...commonFields
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

const Location = mongoose.model('location', locationSchema);

export default Location;