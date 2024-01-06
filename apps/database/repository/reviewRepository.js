import prisma from '../db.conntection.js';

export const throwReviewOnproduct=async(reviewData)=>{
    return await prisma.reviews.create({
        data:reviewData
    })
}

export const fetchProductReviewById=async(reviewId,reviewData)=>{
    return await prisma.reviews.findUnique({
        where:{
            id:reviewId
        }
    })
}

export const modifyTheProductReview=async(reviewId,reviewData)=>{
    return await prisma.reviews.update({
        where:{
            id:reviewId
        },
        data:reviewData
    })
}

export const deleteTheProductReview=async(reviewId)=>{
    return await prisma.reviews.delete({
        where:{
            id:reviewId
        }
    })
}