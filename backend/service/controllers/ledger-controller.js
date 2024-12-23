import * as LedgerService from "./../services/ledger-service.js"
import { setError, setSuccess } from "./response-handler.js";

export const post = async (request, response) => {
    // Creates and saves a new ledger entry for a specific customer and event
    try {
        const newLedger = { ...request.body };
        const customerId = request.headers['customerid'];
        const eventId = request.headers['eventid'];
        if (!customerId || !eventId) {
            throw new Error("Customer or event not found")
        }
        // throw new Error("Bad input");
        const ledger = await LedgerService.save(newLedger, customerId, eventId)
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}
export const get = async (request, response) => {
    try {
        const ledger = await LedgerService.viewAll();
        if (!ledger) {
            return setError("Ledger not found", response, 404);
        }
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}
export const put = async (request, response) => {
     // Updates an existing ledger in the database based on the provided ID and request body
    try {
        const { id } = request.headers
        const updatedLedger = { ...request.body }
        const ledger = await LedgerService.update(id, updatedLedger);
        if (!ledger) {
            return setError("Ledger not found", response, 404);
        }
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}
export const getById = async (request, response) => {
    try {
        const { id } = request.params
        const ledger = await LedgerService.viewById(id);
        if (!ledger) {
            return setError("Ledger not found", response, 404);
        }
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}
export const remove = async (request, response) => {
    try {
        const id  = request.headers['id'];
        const deletedLedger = await LedgerService.deleteById(id);
        if (!deletedLedger) {
            return setError("Ledger not found", response, 404);
        }
        setSuccess({ message: "Ledger deleted successfully" }, response);
    } catch (error) {
        setError(error, response);
    }
};

export const ledgerByOwnerId = async (request, response) => {
    // Retrieves ledger details associated with a specific owner by their ID
    try {
        const ownerId = request.headers['id'];
        if (!ownerId) {
            throw new Error("OwnerId is required")
        }
        // throw new Error("Bad input");
        const ledger = await LedgerService.getLedgersByOwnerId(ownerId)
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}


export const customersByOwnerId = async (request, response) => {
    // Fetches a list of customers associated with a specific owner's events
    try {
        const ownerId = request.headers['id'];
        if (!ownerId) {
            throw new Error("OwnerId is required")
        }
        // throw new Error("Bad input");
        const ledger = await LedgerService.getCustomersByOwnerId(ownerId)
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}

export const ledgerByCustomerId = async (request, response) => {
    // Fetches all ledgers associated with a specific customer using their ID
    try {
        const customerId = request.headers['id'];
        if (!customerId) {
            throw new Error("id is required")
        }
        // throw new Error("Bad input");
        const ledger = await LedgerService.getLedgersByCustomerId(customerId)
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}

export const eventsByOwnerId = async (request, response) => {
    // Retrieves all events associated with a specific owner using their ID
    try {
        const ownerId = request.headers['ownerid'];
        if (!ownerId) {
            throw new Error("OwnerId is required")
        }
        // throw new Error("Bad input");
        const events = await LedgerService.getEventsByOwnerId(ownerId)
        setSuccess(events, response);
    } catch (error) {
        setError(error, response);
    }
}

export const joinAnOngoingEvent = async (request, response) => {
    // Allows a customer to join an ongoing event using their ID and ledger ID
    try {
        // ledgerHashId, customerId
        const ledgerId = request.headers['ledgerid'];
        const customerId = request.headers['customerid'];

        if (!ledgerId || !customerId) {
            throw new Error("id is required")
        }
        const ledgers = await LedgerService.joinAnOngoingEvent(ledgerId, customerId);
        setSuccess(ledgers, response);
    } catch (error) {
        setError(error, response);
    }
}