import mongoose from "mongoose";
import { EventSchema } from "./event.js";

export const slotsSchema = new mongoose.Schema({
    slotDate: {
        required: true,
        type: Date
    },
    slotTime: {
        required: true,
        type: Number,
        match: /^([1-9]|1[0-9]|2[0-4])$/,
    },
    event: {
        required: true,
        type: EventSchema
    },
    available: {
        required: true,
        type: Boolean
    }
},
    {
        toJSON: {
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

const SlotsModel = mongoose.model('Slots', slotsSchema);
export default SlotsModel;