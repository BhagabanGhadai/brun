import express from 'express';
const productRouter=express.Router()

productRouter.route('/').get()

export default productRouter