import mongoose from 'mongoose';
import Slots from '../models/slots.js';
import Events from '../models/event.js';

export const createSlots = async (events) => {
    const slots = [];
    const eventStartHour = events.eventStartTime;
    const eventEndHour = events.eventEndTime;

    // Start slot creation from the next day
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Start from the next day

    // Generate slots for the next 3 days
    for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
        const slotDate = new Date(startDate);
        slotDate.setDate(startDate.getDate() + dayOffset);

        for (let hour = eventStartHour; hour < eventEndHour; hour++) {
            const slotTime = hour;

            // Check if the slot already exists
            const existingSlot = await Slots.findOne({
                slotDate: slotDate, // Match date
                slotTime,
                event: events
            });


            if (!existingSlot) {
                slots.push({
                    slotDate,
                    slotTime,
                    event: events, // Reference the created event
                    available: true
                });
            }
        }
    }

    // Save all new slots in bulk
    if (slots.length > 0) {
        try {
            const savedSlots = await Slots.insertMany(slots);
            return savedSlots;
        } catch (error) {
            console.error("Error creating slots:", error);
            throw new Error("Error Creating slots");
        }
    } else {
        console.log(`No new slots to create for Event ID: ${events._id}`);
        throw new Error("Slots already present");
    }
};

export const slotsToBook = async (event, startTime, noOfHours, eventBookedDate) => {
    await deleteOldSlots()
    try {
        // Parse start time as integer
        const start = parseInt(startTime, 10);

        // Calculate the end time based on start time and number of hours
        const end = start + noOfHours;

        // Loop over the time range and check availability
        const slotsToBook = [];
        for (let hour = start; hour < end; hour++) {

            // Find slot by event, date, and hour
            const slot = await Slots.findOne({
                slotDate: new Date(eventBookedDate), // Match date
                slotTime: hour, // Match the exact hour
                'event.eventHashId': event
            });


            if (!slot || !slot.available) {
                // If slot is unavailable, exit the loop
                console.log(`Slot at ${hour}:00 for ${eventBookedDate} is not available.`);
                return { success: false, message: `Slot at ${hour}:00 is unavailable.` };
            }

            // If slot is available, add it to the slots to be booked
            slotsToBook.push(slot);
        }

        // If we found all slots available, proceed with booking
        if (slotsToBook.length > 0) {
            // Mark the slots as unavailable
            const bookedSlots = await Slots.updateMany(
                { _id: { $in: slotsToBook.map(slot => slot._id) } },
                { $set: { available: false } }
            );
            console.log("Slots booked successfully.");
            return { success: true, message: "Slots booked successfully.", data: bookedSlots };
        } else {
            return { success: false, message: "No slots available for booking." };
        }
    } catch (error) {
        console.error("Error booking slots:", error);
        return { success: false, message: "Error booking slots." };
    }
};

export const fetchAvailableOrUnavailableSlots = async (availability) => {
    const deletesOldSlots = await deleteOldSlots();
    if (deleteOldSlots) {
        const availableSlots = await Slots.find({ available: availability })

        let divideByEvents = [];
        const uniqueEventIds = [...new Set(availableSlots.map(slot => slot.event.eventHashId))];

        for (const eventHashId of uniqueEventIds) {
            const eventFetched = await Events.findOne({ eventHashId });

            const slots = await Slots.find({ 'event.eventHashId': eventHashId, available: availability });

            if (slots.length > 0)
                divideByEvents.push(slots)
        }
        return divideByEvents;
    } else {
        throw new Error("SOMETHING WENT WRONG")
    }
}

export const fetchAvailableSlotsWithEventId = async (availability, eventId) => {
    const availableSlots = Slots.find({ available: availability, 'event._id': new mongoose.Types.ObjectId(eventId) })
    return availableSlots;
}


const deleteOldSlots = async () => {
    try {
        // Calculate the cutoff date: start of today
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Delete slots with slotDate before today
        const result = await Slots.deleteMany({ slotDate: { $lt: cutoffDate } });
        console.log(`${result.deletedCount} old slots were deleted.`);
        return true;
    } catch (error) {
        console.error('Error deleting old slots:', error);
        return false;
    }
};
