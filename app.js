import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiError } from './utils/ApiError.js';

/**routers**/
import healthcheckRouter from "./routes/healthcheck.routes.js";

export const start = (app) => {
    app.use(helmet())
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: "*", credentials: true }));

    if (env.NODE_ENV == "dev") app.use(morgan('dev'))

    /**Api's**/
    app.use("/api/v1/healthcheck", healthcheckRouter);

    app.use((req,res,next)=>{
        throw new ApiError(404,"Api not found")
    })
    app.use((req,res,next)=>{
        req.setTimeout(5000)
        res.setTimeout(5000)
    })
    app.use(errorHandler)
}