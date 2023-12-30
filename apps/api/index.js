import express from 'express';
const router=express.Router()
import healthCheckrouter from '../api/healthCheck.js'

router.use('/api/v1',healthCheckrouter)

export default router