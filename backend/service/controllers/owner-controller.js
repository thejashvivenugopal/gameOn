import * as ownerService from "../services/owner-service.js";
import { setError, setSuccess } from "./response-handler.js";

// POST (Create an Owner)
export const post = async (request, response) => {
    try {
        const newOwner = { ...request.body };
        const owner = await ownerService.save(newOwner);
        setSuccess(owner, response);
    } catch (error) {
        setError(error, response);
    }
};

// GET (Retrieve All Owners)
export const getAll = async (request, response) => {
    try {
        const owners = await ownerService.findAll();
        setSuccess(owners, response);
    } catch (error) {
        setError(error, response);
    }
};

// GET (Retrieve an Owner by ID)
export const getById = async (request, response) => {
    try {
        const { id } = request.headers;
        const owner = await ownerService.findById(id);
        if (!owner) {
            return setError("Owner not found", response, 404);
        }
        setSuccess(owner, response);
    } catch (error) {
        setError(error.message, response, 500);
    }
};

// PUT (Update an Owner by ID)
export const update = async (request, response) => {
    try {
        const { id } = request.headers;
        const updatedOwner = { ...request.body };
        const owner = await ownerService.update(id, updatedOwner);
        if (!owner) {
            return setError("Owner not found", response, 404);
        }
        setSuccess(owner, response);
    } catch (error) {
        setError(error, response);
    }
};

// DELETE (Delete an Owner by ID)
export const remove = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedOwner = await ownerService.deleteById(id);
        if (!deletedOwner) {
            return setError("Owner not found", response, 404);
        }
        setSuccess({ message: "Owner deleted successfully" }, response);
    } catch (error) {
        setError(error, response);
    }
};


