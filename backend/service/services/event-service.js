
import Event from "../models/event.js";
import * as ownerService from './owner-service.js'
import * as locationService from './location-service.js'
import * as slotsService from './slots-service.js'
import mongoose from "mongoose";

// Saving a new event
export const save = async (eventData, ownerId) => {
  const owner = await ownerService.findByHashId(ownerId);
  if (owner) {
    const locationData = eventData.location;
    const savedLocation = await locationService.save(locationData);
    const event = new Event(eventData);
    event._id = savedLocation._id;
    event.owner = owner;
    event.location = savedLocation;
    console.log("9");
    console.log(owner?.user?.password);

    const savedEvent = await event.save();
    return savedEvent;
  }
};

// Find all events
export const findAll = async () => {
  return await Event.find();
};

// Find an event by ID
export const findById = async (eventHashId) => {
  return await Event.findOne({ eventHashId });
};

export const findByEventHashId = async (eventHashId) => {
  return await Event.findOne({ eventHashId });
};


// Update event by ID
export const update = async (id, updatedData) => {
  return await Event.findByIdAndUpdate(id, updatedData, { new: true });  // The { new: true } option returns the updated document
};


// Delete event by ID
export const deleteById = async (id) => {
  return await Event.findByIdAndDelete(id);
};

export const findByOwnerHashId = async (ownerHashId) => {
  // return await Event.find({ owner: ownerObject });
  const events = await Event.find({ 'owner.user.userHashId': ownerHashId });

  return events;

};
