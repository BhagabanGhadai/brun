import slugify from "slugify";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { catchAsync } from '../../utils/catchAsync.js';
import { UPLOAD_MULTIPLE_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js'
import { fetchCategory } from '../database/repository/productCategoryRepository.js';
import {createProduct, createMultipleProduct, fetchProductBySlug, fetchProductByProductId, updateProductBySlug, deleteProductBySlug,deleteMultipleProductImage,fetchAllProduct, addProductImage, fetchAllImageOfaProduct, deleteProductImage, fetchImageById, bannerImageCheck,makeImageBannerImage} from '../database/repository/productRepository.js'
import { deleteMultipleReviewOfproduct } from '../database/repository/reviewRepository.js'
import { getAllWishListOfAProduct,removeAllproductFromWishList } from '../database/repository/wishlistRepository.js';
import { fetchAllCartFromProductId,removeProductsFromMultipleCart } from '../database/repository/cartRepository.js';

export const addProductToStock = catchAsync(async (req, res) => {
    let categoryCheck = await fetchCategory(req.body.category_id)
    if (!categoryCheck) {
        throw new ApiError(404, 'category not found')
    }
    req.body.slug = slugify(req.body.name)
    let slugCheck = await fetchProductBySlug((req.body.slug))
    if (slugCheck) {
        throw new ApiError(400, 'slug already in use')
    }
    let productListing = await createProduct(req.body)
    return res.status(201).send(201, productListing, 'product added successfully')
})

export const addBulkProductToStock = catchAsync(async (req, res) => {
    let { products } = req.body
    if (!Array.isArray(products) || products.length === 0) {
        throw new ApiError(400, 'invalid request body')
    }
    let newProduct = await Promise.all(products.map(async (product) => {
        product.slug = slugify(product.name)
        let slugCheck = await fetchProductBySlug((product.slug))
        if (slugCheck) {
            throw new ApiError(400, 'slug already in use')
        }
        return product
    }))
    let productListing = await createMultipleProduct(newProduct)
    return res.status(201).send(201, productListing, 'product added successfully')
})

export const stockProductDetails = catchAsync(async (req, res) => {
    let productExists = await fetchProductBySlug(req.params.slug)
    if (!productExists) {
        throw new ApiError(404, 'product not found')
    }
    return res.status(200).send(new ApiResponse(200, productExists, 'Product Details Fetched Successful'))
})

export const getAllProductInStock = catchAsync(async (req, res) => {
    let filter = {
        include: {
            image: true,
            category:true,
            subcategory:true
        }
    }
    if (req.query.sort) {
        req.query.sort == "asc" ? req.query.sort = "asc" : req.query.sort = "desc"
        filter.orderBy = { created_at: req.query.sort }
    }
    if(req.query.publish){
        req.query.publish == "true" ? req.query.publish = true : req.query.publish = false
        filter.where={
            ...filter.where,
            is_published:req.query.publish
        }
    }
    if(req.query.category){
        filter.where={
            ...filter.where,
            category_id:req.query.category
        }
    }
    if(req.query.subcategory){
        filter.where={
            ...filter.where,
            subcategory_id:req.query.subcategory
        }
    }
    if (req.query.search) {
        filter.where = {
            ...filter.where,
            OR:[
                {
                    name: {
                        contains: req.query.search,
                        mode: 'insensitive'
                    } 
                },
                {
                    category:{
                        category_name :{
                            contains: req.query.search,
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    subcategory:{
                        subcategory_name :{
                            contains: req.query.search,
                            mode: 'insensitive'
                        }
                    }
                }  
            ]
        };
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    filter.skip = skip;
    filter.take = pageSize;
    let allFilteredProduct = await fetchAllProduct(filter)
    return res.status(200).send(new ApiResponse(200, allFilteredProduct, 'product fetched successfully'))
})

export const updateProductInstock = catchAsync(async (req, res) => {
    let productExists = await fetchProductBySlug(req.params.slug)
    if (!productExists) {
        throw new ApiError(404, 'product not found')
    }
    let updateProduct = await updateProductBySlug(req.params.slug, req.body)
    return res.status(200).send(new ApiResponse(200, updateProduct, 'Product Updated Successful'))
})

export const removeProductToStock = catchAsync(async (req, res) => {
    let productExists = await fetchProductBySlug(req.params.slug)
    if (!productExists) {
        throw new ApiError(404, 'product not found')
    }
    if(productExists.image&&productExists.image.length>0){
        let removeImage = await deleteMultipleProductImage(productExists.id)
        if(removeImage.count){
            productExists.image.forEach(async(img) => {
                    if (img?.image_id) {
                        await DELETE_IMAGE(img?.image_id)
                    }
            });
        }
    }
    if(productExists.review&&productExists.review.length){
        await deleteMultipleReviewOfproduct(productExists.id)
    }
    let wishlist=await getAllWishListOfAProduct(productExists.id)
    if(wishlist.length){
        await removeAllproductFromWishList(productExists.id)
    }
    let cartList=await fetchAllCartFromProductId(productExists.id)
    if(cartList.length){
        await removeProductsFromMultipleCart(productExists.id)
    }
    let deleteProduct = await deleteProductBySlug(req.params.slug)
    return res.status(204).send(new ApiResponse(204, deleteProduct, 'Product Deleted Successful'))
})

export const addProductImages = catchAsync(async (req, res) => {
    if (!req.files && !req.files["product_image"]) {
        throw new ApiError(400, 'product image required')
    }
    let productExists = await fetchProductByProductId(req.body.product_id)
    if (!productExists) {
        throw new ApiError(404, 'no product found')
    }
    let uploadImages = await UPLOAD_MULTIPLE_IMAGE(req.files.product_image)
    if(!uploadImages?.length){
        throw new ApiError(400,'error while uploading image')
    }
    let addImage = await Promise.all(uploadImages.map(async (image) => {
        return await addProductImage({ product_id: req.body.product_id, image_id: image.public_id })
    }))
    return res.status(200).send(new ApiResponse(200, addImage, 'product image added'))

})

export const getAllImageOfAProduct = catchAsync(async (req, res) => {
    let allImageOfProduct = await fetchAllImageOfaProduct(req.params.product_id)
    return res.status(200).send(new ApiResponse(200, allImageOfProduct, 'all image of a product fetched successfully'))
})

export const makeProductImageBannerImage = catchAsync(async (req, res) => {
    const imageExist = await fetchImageById(req.params.id)
    if (!imageExist) {
        throw new ApiError(404, 'no image found')
    }
    if (imageExist.is_banner) {
        throw new ApiError(400, 'image alreday a banner image')
    }
    let checkOtherImageBannerOrNot = await bannerImageCheck(imageExist.product_id)
    if (checkOtherImageBannerOrNot.length) {
        throw new ApiError(400, 'anthore image alreday a banner image')
    }
    let updateImage = await makeImageBannerImage(req.params.id)
    return res.status(200).send(new ApiResponse(200, updateImage, 'image is now default banner image'))
})

export const removeProductImage = catchAsync(async (req, res) => {
    const imageExist = await fetchImageById(req.params.id)
    if (!imageExist) {
        throw new ApiError(404, 'no image found')
    }
    let removeImage = await deleteProductImage(req.params.id)
    if (removeImage) {
        if (removeImage?.image_id) {
            await DELETE_IMAGE(removeImage?.image_id)
        }
    }
    return res.status(204).send(new ApiResponse(204, removeImage, 'image successfully removed'))
})

