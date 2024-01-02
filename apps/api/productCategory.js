import express from 'express';
const categoryRouter=express.Router()
import { addProductCategory,getProductCategory,getAllProductCategory,updateProductCategory,deleteProductCategory  } from '../services/productCategoryService.js';

categoryRouter.route('/').post(addProductCategory)
categoryRouter.route('/all/').get(getAllProductCategory)
categoryRouter.route('/:id').get(getProductCategory)
categoryRouter.route('/:id').patch(updateProductCategory)
categoryRouter.route('/:id').delete(deleteProductCategory)

export default categoryRouter