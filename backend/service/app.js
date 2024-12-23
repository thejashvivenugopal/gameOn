// 
import mongoose from "mongoose";
import corse from 'cors';
import express from 'express';

import initializeRouters from "./routers/index.js";

const initialize = (app) => {
    app.use(corse());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect(process.env.MONGO_CONNECTION);
    initializeRouters(app);
}

export default initialize;