import express from 'express';
const router=express.Router();
import healthCheckRouter from '../api/healthCheck.js';
import userRouter from '../api/userApi.js';
import profileRouter from '../api/profileApi.js';
import categoryRouter from '../api/productCategory.js';

router.use('/api/v1',healthCheckRouter)
router.use('/api/v1/user',userRouter)
router.use('/api/v1/profile',profileRouter)
router.use('/api/v1/category',categoryRouter)

export default router