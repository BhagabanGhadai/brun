import express from 'express';
const router=express.Router();
import healthCheckRouter from '../api/healthCheck.js';
import userRouter from '../api/userApi.js';
import profileRouter from '../api/profileApi.js';
import categoryRouter from '../api/productCategory.js';
import subCategoryRouter from '../api/productSubCategoryApi.js';
import productRouter from '../api/productApi.js';

router.use('/api/v1',healthCheckRouter)
router.use('/api/v1/user',userRouter)
router.use('/api/v1/profile',profileRouter)
router.use('/api/v1/category',categoryRouter)
router.use('/api/v1/sub-category',subCategoryRouter)
router.use('/api/v1/product',productRouter)

export default router