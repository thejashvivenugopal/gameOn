import Ledger from "./../models/ledgers.js"
import Customer from "../models/user.js"
import * as userService from './user-server.js'
import * as eventService from './event-service.js'
import * as ownerService from './owner-service.js'
import * as slotsService from './slots-service.js'
import mongoose from "mongoose";


export const save = async (newLedger, customerId, eventHashId) => {
     // Save ledger information for a customer after validating event and slot availability
    const customerData = await userService.find(customerId);
    if (!customerData || customerData.role != 'CUSTOMER')
        throw new Error("customer not found");

    const eventData = await eventService.findByEventHashId(eventHashId)
    const eventBookedDate = new Date(newLedger?.eventBookedDate);
    if (!eventData) {
        throw new Error("Event not found");
    }
    let ledgersSaved = [];
    for (const oneStart of newLedger?.startTime) {
        const newLedgerRequest = newLedger;
        newLedgerRequest.startTime = oneStart;
        const slots = await slotsService.slotsToBook(eventHashId, newLedgerRequest?.startTime, newLedger?.noOfHours, eventBookedDate);
        if (!slots?.success) {
            throw new Error(slots?.message ? slots?.message : "Slots Error")
        }
        const ledger = new Ledger(newLedgerRequest);
        ledger.event = eventData;
        ledger.customer = customerData;
        ledger.amount = ledger?.event?.amountPerHour;
        ledger.ownerHashId = ledger?.event?.owner?.user?.userHashId;
        const savedLedger = await ledger.save();
        ledgersSaved.push(savedLedger);
    }
    return ledgersSaved;
}
export const viewAll = async () => {
    return await Ledger.find();
}
export const viewById = async (id) => {
    return await Ledger.findById(id);
}
export const update = async (ledgerHashId, updateLedger) => {

    return await Ledger.findOneAndUpdate({ ledgerHashId }, updateLedger, { new: true });

}
export const deleteById = async (ledgerHashId) => {
    const ledger = await Ledger.findOne({ledgerHashId})
    return await Ledger.deleteOne(ledger);
};
// Function to get ledgers based on owner ID
export const getLedgersByOwnerId = async (userHashId) => {

    const owner = await ownerService.findById(userHashId);

    if (owner) {
        const ledgers = await Ledger.find({ ownerHashId: userHashId });
        // ledgerToAdd?.forEach((a) => console.log(a.event.eventHashId));
        return ledgers;
    }
    else {
        throw new Error('Owner not found');
    }
}

export const getLedgersByCustomerId = async (userHashId) => {
    // console.log('test', userHashId);
    const customer = await userService.find(userHashId);

    // console.log('cust:', customer);

    if (customer) {

        return await Ledger.find({ "customer.userHashId": userHashId })

    }
    else {
        throw new Error('Owner not found');
    }
}

export const getCustomersByOwnerId = async (ownerId) => {
    // Fetch customers associated with a specific owner by retrieving their events and ledgers
    const owner = await ownerService.findById(ownerId);
    if (owner) {
        const events = await eventService.findByOwner(ownerId)
        const ledgers = await Ledger.find({ event: events });
        const customerSet = new Set();
        ledgers.forEach((ledger) => {
            customerSet.add(ledger.customer)
        })
        const customers = Array.from(customerSet);
        return customers;
    }
    else {
        throw new Error('Owner not found');
    }
}

export const getEventsByOwnerId = async (ownerHashId) => {
    const owner = await ownerService.findByHashId(ownerHashId);

    if (owner) {
        const events = await eventService.findByOwnerHashId(ownerHashId)
        return events;
    }
    else {
        throw new Error('Owner not found');
    }
}

export const joinAnOngoingEvent = async (ledgerHashId, customerId) => {
    // Allows a customer to join an ongoing event by updating the ledger with the customer's details
    const ledger = await Ledger.findOne({ ledgerHashId });
    if (!ledger)
        throw new Error("ledger not found")
    else {
        const customerToJoin = await Customer.findOne({ _id: customerId, role: 'CUSTOMER' })
        if (!customerToJoin) {
            throw new Error('CUSTOMER NOT FOUND')
        }

        ledger.usersJoined.push(customerToJoin);
        ledger.noOfPlayers -= 1;
        return await Ledger.findOneAndUpdate(
            { _id: ledger._id },
            ledger,
            { new: true }
        );
    }
}
