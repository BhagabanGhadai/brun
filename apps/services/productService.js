import slugify from "slugify";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { catchAsync } from '../../utils/catchAsync.js';
import { UPLOAD_MULTIPLE_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js'
import { fetchCategory } from '../database/repository/productCategoryRepository.js';
import {createProduct, createMultipleProduct, fetchProductBySlug, fetchProductByProductId, updateProductBySlug, deleteProductBySlug,
fetchAllProduct, addProductImage, fetchAllImageOfaProduct, deleteProductImage, fetchImageById, bannerImageCheck,makeImageBannerImage} from '../database/repository/productRepository.js'


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
            image: true
        }
    }
    if (req.query.sort) {
        req.query.sort == "asc" ? req.query.sort = "asc" : req.query.sort = "desc"
        filter.orderBy = { created_at: req.query.sort }
    }
    if(req.query.category){
        filter.where={
            category_id:req.query.category
        }
    }
    if(req.query.subcategory){
        filter.where={
            subcategory_id:req.query.subcategory
        }
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;
    filter.offset = offset;
    filter.limit = pageSize;
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
    let uploadImage = await UPLOAD_MULTIPLE_IMAGE(req.files.product_image)
    let addImage = await Promise.all(uploadImage.map(async (image) => {
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

