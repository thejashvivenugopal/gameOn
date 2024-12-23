import * as UserService from "../services/userStats-service.js"
import { setError, setSuccess } from "./response-handler.js";

export const get = async (request, response) => {
    try {
        const ownerHashId = request.headers['id'];
        if (!ownerHashId) {
            throw new Error('id is required')
        }
        const ledger = await UserService.userStats(ownerHashId);
        if (!ledger) {
            return setError("Ledger not found", response, 404);
        }
        setSuccess(ledger, response);
    } catch (error) {
        setError(error, response);
    }
}