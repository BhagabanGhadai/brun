import express from 'express';
const productRouter=express.Router()
import { UploadFile } from '../../middlewares/multer.mw.js'
import { addProductToStock, getAllProductInStock, addBulkProductToStock,updateProductInstock,removeProductToStock,addProductImages,getAllImageOfAProduct,makeProductImageBannerImage,removeProductImage,stockProductDetails} from './../services/productService.js'

productRouter.route('/').post(addProductToStock)
productRouter.route('/bulk-add').post(addBulkProductToStock)
productRouter.route('/').get(getAllProductInStock)
productRouter.route('/:slug').get(stockProductDetails)
productRouter.route('/:slug').patch(updateProductInstock)
productRouter.route('/:slug').delete(removeProductToStock)

productRouter.route('/image').post(UploadFile.fields([{name:'product_image',maxCount:10}]),addProductImages)
productRouter.route('/image/:product_id').get(getAllImageOfAProduct)
productRouter.route('/image/:id').patch(makeProductImageBannerImage)
productRouter.route('/image/:id').delete(removeProductImage)

export default productRouter