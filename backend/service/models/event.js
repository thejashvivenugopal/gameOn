import mongoose from "mongoose";
import { locationSchema } from "./location.js";
import { ownerSchema } from "./owner.js";
import commonFields from "./commonFields.js";
import { v4 as uuidv4 } from 'uuid';


export const EventSchema = new mongoose.Schema({

    //Type of Event(Ceg:Cricket,Football,Basket ball)
    eventType: {
        type: String,
        required: true
    },
    imageUrl: { 
        type: String, 
        required: false  
    },
    eventHashId: {
        type: String,
        required: true,
        default: uuidv4
    },
    //start time of an Event
    eventStartTime: {
        type: Number,
        required: true,
        match: /^([1-9]|1[0-9]|2[0-4])$/,
    },
    //End time of an Event
    eventEndTime: {
        type: Number,
        required: true,
        match: /^([1-9]|1[0-9]|2[0-4])$/,
    },

    eventImageURL:{
        type: String,
        required:true,
    },
    //Amount needed to pay for hour
    amountPerHour: {
        type: Number,
        required: true
    },
    //owner details
    owner: {
        type: ownerSchema,
        required: true
    },
    //Location details
    location: {
        type: locationSchema,
        required: true
    },
    //common fields details
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

// Creating the Event model
const EventModel = mongoose.model('Event', EventSchema);
export default EventModel;
