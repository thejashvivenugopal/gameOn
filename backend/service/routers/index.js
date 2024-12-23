import eventRouter from '../routers/event-route.js'
import locationRouter from './location-router.js'
import ownerRouter from './owner-router.js'
import ledgerRouter from './ledger-router.js'
import userRouter from '../routers/user-router.js'
import userStatsRouter from '../routers/userStats-router.js'
import customerRouter from '../routers/customers-route.js'
import cartRouter from './cart-route.js'
import slotsRouter from './slots-route.js'


const initializeRouters = (app) => {
    app.use('/owners', ownerRouter);
    app.use('/locations', locationRouter);
    app.use('/ledgers', ledgerRouter);
    app.use('/users', userRouter);
    app.use('/events', eventRouter);
    app.use('/userstats', userStatsRouter);
    app.use('/customers', customerRouter);
    app.use('/cart', cartRouter);
    app.use('/slots', slotsRouter);
}


export default initializeRouters;