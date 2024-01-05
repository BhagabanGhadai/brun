import prisma from '../db.conntection.js';

export const createProduct = async (productData) => {
    return await prisma.product.create({
        data: productData
    })
}

export const createMultipleProduct = async (products) => {
    return await prisma.product.createMany({
        data: products,
        skipDuplicates: true
    })
}

export const fetchAllProduct = async (filter) => {
    return await prisma.product.findMany(filter)
}

export const fetchProductByProductId = async (ProductId) => {
    return await prisma.Product.findUnique({
        where: {
            id: ProductId
        }
    })
}

export const fetchProductBySlug = async (slug) => {
    return await prisma.Product.findUnique({
        where: {
            slug: slug
        },
        include:{
            image:true,
            category:true,
            subcategory:true
        }
    })
}

export const updateProductBySlug = async (slug,productData) => {
    return await prisma.Product.update({
        where: {
            slug: slug
        },
        data:productData
    })
}

export const deleteProductBySlug = async (slug) => {
    return await prisma.Product.delete({
        where: {
            slug: slug
        }
    })
}

export const addProductImage = async (productData) => {
    return await prisma.image.create({
        data: productData
    })
}

export const fetchImageById = async (imageId) => {
    return await prisma.image.findUnique({
        where: {
            id: imageId
        }
    })
}

export const fetchAllImageOfaProduct = async (productId) => {
    return await prisma.image.findMany({
        where: {
            id: productId
        }
    })
}

export const bannerImageCheck = async (productId)=>{
    return await prisma.image.findMany({
        where: {
            product_id: productId,
            is_banner:true
        }
    })
}

export const makeImageBannerImage = async (imageId) => {
    return await prisma.image.update({
        where:{
            id:imageId
        },
        data:{
            is_banner:true
        }
    })
}

export const deleteProductImage = async (imageId) => {
    return await prisma.image.delete({
        where: {
            id:imageId
        }
    })
}
