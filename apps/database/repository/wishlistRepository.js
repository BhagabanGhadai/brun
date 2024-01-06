import prisma from '../db.conntection.js';

export const addProductToWishList=async(wishlistData)=>{
    return await prisma.wishlist.create({
        data:wishlistData
    })
}

export const getproductFromWishList=async(wishlistData)=>{
    return await prisma.wishlist.findUnique({
        where:wishlistData
    })
}

export const getAllWishListProductOfUser=async(userId)=>{
    return await prisma.wishlist.findMany({
        where:{
            user_id:userId
        }
    })
}

export const getAllWishListOfAProduct=async(productId)=>{
    return await prisma.wishlist.findMany({
        where:{
            product_id:productId
        }
    })
}

export const removeproductFromWishList=async(wishlistData)=>{
    return await prisma.wishlist.delete({
        where:wishlistData
    })
}