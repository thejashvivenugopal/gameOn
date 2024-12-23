import * as locationService from '../services/location-service.js'
import { setError, setSuccess } from '../controllers/response-handler.js'
import { request, response } from 'express';

export const post = async (request, response) => {
    try {
        const newLocation = { ...request.body };
        const location = await locationService.save(newLocation);
        setSuccess(location, response);
    } catch (error) {
        setError(error, response)
    }
}

export const getAll = async (request, response) => {
    try {
        const locations = await locationService.getAll();
        setSuccess(locations, response);
    } catch (error) {
        setError(error, response)
    }
}


export const getLocationById = async (request, response) => {
    try {
        const locations = await locationService.getById(request?.params?.id);
        setSuccess(locations, response);
    } catch (error) {
        return setError("Location not found", response, 404);
    }
}

export const update = async (request, response) => {
    try {
        const location = await locationService.update(request.params.id, request.body)
        setSuccess(location, response);
    } catch (error) {
        return setError("Location not found", response, 404);
    }
}

export const deleteLocationById = async (request, response) => {
    try {
        locationService.deleteLocationById(request.params.id)
        setSuccess("location deleted successfully", response);
    } catch (error) {
        setError(error, response);
    }
}