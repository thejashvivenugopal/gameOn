
import * as eventService from "../services/event-service.js";
import { setError, setSuccess } from "./response-handler.js";

// POST (To Create a Event)
export const post = async (request, response) => {
    try {
        const newEvent = { ...request.body };
        const ownerId = request.headers['ownerid']
        if (!ownerId)
            throw new Error('owner id is required')
        const event = await eventService.save(newEvent, ownerId);
        setSuccess(event, response);
    } catch (error) {
        setError(error, response);
    }
};
// GET (Retrive All Events)
export const getAll = async (request, response) => {
    try {
        const events = await eventService.findAll();
        setSuccess(events, response);
    } catch (error) {
        setError(error, response);
    }
};

// GET (Retrieve a specific Event by ID)
export const getById = async (request, response) => {
    try {
        const { id } = request.params;
        const event = await eventService.findById(id);
        if (!event) {
            return setError("Event not found", response, 404);
        }
        setSuccess(event, response);
    } catch (error) {
        setError(error.message, response, 500); 
    }
};


// PUT (Update an existing Event by ID)
export const update = async (request, response) => {
    try {
        const { id } = request.params;
        const updatedEvent = { ...request.body };
        const event = await eventService.update(id, updatedEvent);
        if (!event) {
            return setError("Event not found", response, 404);
        }
        setSuccess(event, response);
    } catch (error) {
        setError(error, response);
    }
};

// DELETE (Delete an  Event by ID)
export const remove = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedEvent = await eventService.deleteById(id);
        if (!deletedEvent) {
            return setError("Event not found", response, 404);
        }
        setSuccess({ message: "Event deleted successfully" }, response);
    } catch (error) {
        setError(error, response);
    }
};
