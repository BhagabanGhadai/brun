import prisma from '../db.conntection.js';

export const createCategory = async (categoryName) => {
    return await prisma.productcategory.create({
        data: {
            categoryName: categoryName
        }
    });
};

export const fetchAllCategories = async () => {
    return await prisma.productcategory.findMany();
};

export const fetchCategory = async (categoryName) => {
    return await prisma.productcategory.findUnique({
        where: {
            categoryName: categoryName
        }
    });
};

export const updateCategory = async (categoryId, categoryName) => {
     await prisma.productcategory.update({
        where: {
            id: categoryId
        },
        data: {
            categoryName: categoryName
        }
    });
};

export const deleteCategory = async (categoryId, categoryName) => {
    await prisma.productcategory.update({
       where: {
           id: categoryId
       }
   });
};