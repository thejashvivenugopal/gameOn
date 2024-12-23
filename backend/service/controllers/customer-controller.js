import * as customerService from '../services/customer-service.js'
import { setError, setSuccess } from './response-handler.js';

export const fetchAllCustomers = async (request, response) => {
    try {
        const customers = await customerService.findAllCustomers();
        if (!customers) {
            return setError("Customers not found", response, 404)
        }
        setSuccess(customers, response);
    }
    catch (error) {
        setError(error, response);
    }
}