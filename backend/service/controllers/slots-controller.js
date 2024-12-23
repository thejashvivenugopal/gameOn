import * as slotsService from '../services/slots-service.js';
import * as eventsService from '../services/event-service.js';
import { setSuccess, setError } from './response-handler.js';

export const fetchAvailableOrUnavailableSlots = async (request, response) => {
    try {
        const availability = request.headers['available']
        const slotsFetched = await slotsService.fetchAvailableOrUnavailableSlots(availability);
        setSuccess(slotsFetched, response);
    } catch (error) {
        console.log(error);
        setError(error, response);
    }
};

export const fetchAvailableSlotsByEvents = async (request, response) => {
    try {
        const availability = request.headers['available'];
        const eventId = request.headers['eventid']
        const slotsFetched = await slotsService.fetchAvailableSlotsWithEventId(availability, eventId);
        setSuccess(slotsFetched, response);
    } catch (error) {
        console.log(error);
        setError(error, response);
    }
};

export const createSlots = async (request, response) => {
    try {
        // const availability = request.headers['available'];
        const eventId = request.headers['id']
        const event = await eventsService.findById(eventId);
        const createdSlots = await slotsService.createSlots(event);
        setSuccess(createdSlots, response);
    } catch (error) {
        console.log(error);
        setError(error, response);
    }
};