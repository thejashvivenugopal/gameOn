import Ledger from "./../models/ledgers.js"
import * as userService from './user-server.js'
import Stripe from "stripe";
import dotenv from "dotenv"
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)



export const cartDetails = async (customerId) => {
    // Fetches the details of unpaid services (ledger entries) for a given customer
    const customerData = await userService.find(customerId);
    if (!customerData || customerData.role != 'CUSTOMER')
        throw new Error("customer not found");
    let serviceData = [];
    const ledgerData = await Ledger.find({paymentStatus: false, "customer.userHashId": `${customerId}`});
    ledgerData.map((e, index)=>{
        const id = index + 1;
        const name = e.event.eventType;
        const price = e.amount;
        const start_time = e.startTime;
        const no_of_hours = e.noOfHours;
        const ledger_hash_id = e.ledgerHashId;
        serviceData.push({
            id: id,
            name: name,
            price: price,
            start_time: start_time,
            no_of_hours: no_of_hours,
            ledger_hash_id: ledger_hash_id
        });
    })
    return serviceData;
};

export const checkout = async (cartItems) => {
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cartItems,
        success_url: `http://localhost:5173/dashboard/customers/bookings?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/dashboard/userStats`
    });
    return session.url; // Return the session URL for redirection
};

export const retrieveSession = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if the payment was successful
        if (session.payment_status === 'paid') {
            console.log('Payment verified successfully.');
            return { success: true, session };
        } else {
            return { success: false, message: 'Payment not completed.' };
        }
    } catch (error) {
        console.error('Error verifying session:', error);
        throw new Error('Internal Server Error');
    }
};