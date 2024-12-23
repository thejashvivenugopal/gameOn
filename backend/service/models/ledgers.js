import mongoose from "mongoose";
import { UserSchema } from "./user.js";
import { EventSchema } from "./event.js";
import commonFields from "./commonFields.js";
import { v4 as uuidv4 } from 'uuid';


const ledgerSchema = new mongoose.Schema({
    event: {
        required: true,
        type: EventSchema
    },
    ledgerHashId: {
        type: String,
        required: true,
        default: uuidv4
    },
    customer: {
        required: true,
        type: UserSchema
    },
    startTime: {
        type: Number,
        required: true,
        match: /^([1-9]|1[0-9]|2[0-4])$/,
    },

    eventBookedDate: {
        type: Date,
        required: true,

    },
    noOfHours: {
        required: true,
        type: Number
    },
    amount: {
        required: true,
        type: Number
    },
    paymentStatus: {
        required: true,
        type: Boolean,
        default: false,
    },
    debit: {
        required: true,
        type: Boolean
    },
    public: {
        required: true,
        type: Boolean
    },
    noOfPlayers: {
        required: true,
        type: Number
    },
    ownerHashId: {
        type: String,
        required: true
    },
    usersJoined: [
        {
            type: UserSchema
        }
    ],
    ...commonFields
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

const LedgerModel = mongoose.model('ledger', ledgerSchema);
export default LedgerModel;