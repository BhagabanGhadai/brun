import express from 'express';
const subcategoryRouter=express.Router()
import { addProductSubCategory,getAllSubCategoryOfCategory,getProductSubCategory,updateProductSubCategory,deleteProductSubCategory } from '../services/productSubCategoryServices.js';

subcategoryRouter.route('/').post(addProductSubCategory)
subcategoryRouter.route('/all/:category_id').get(getAllSubCategoryOfCategory)
subcategoryRouter.route('/:id').get(getProductSubCategory)
subcategoryRouter.route('/:id').patch(updateProductSubCategory)
subcategoryRouter.route('/:id').delete(deleteProductSubCategory)

export default subcategoryRouter