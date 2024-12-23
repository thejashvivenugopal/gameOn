import * as CartService from "../services/cart-service.js"
import { setError, setSuccess } from "./response-handler.js";

export const cartByCustomerId = async (request, response) => {
    try {
        const customerId = request.headers['customerid'];

        if (!customerId) {
            throw new Error("customerId is required")
        }
        const cartItems = await CartService.cartDetails(customerId);
        if (!cartItems) {
            return setError("cartItems not found", response, 404);
        }
        setSuccess(cartItems, response);
    } catch (error) {
        setError(error, response);
    }
}

export const checkout = async (request, response) =>{
    try{
        const cartItems = request.body.items
        const checkout = await CartService.checkout(cartItems)
        if(!checkout) {
            return setError("items not found", response, 404);
        }
        setSuccess(checkout, response);
        return checkout;
        // console.log(response);
    } catch (error) {
        // console.log(error);

        setError(error, response)
    }
}


export const verifySession = async (req, res) => {
    const { sessionId } = req.body;

    try {
        const result = await CartService.retrieveSession(sessionId);

        if (result.success) {
            return res.status(200).send({ success: true, session: result.session });
        } else {
            return res.status(400).send({ success: false, message: result.message });
        }
    } catch (error) {
        console.error('Error in verifySession controller:', error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};