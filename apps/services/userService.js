import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { catchAsync } from '../../utils/catchAsync.js';
import { generateEncryptedPassword, validateThePassword, generateAccessAndRefreshTokens } from '../../utils/helper.js';
import { createUser, fetchUserByEmail, fetchUserById,deleteUserById,updateUserById,getAllUser } from '../database/repository/userRepository.js';

export const registerUser = catchAsync(async (req, res) => {
    let { first_name, last_name, email, password, role } = req.body
    const userExists = await fetchUserByEmail(email)
    if (userExists) {
        throw new ApiError(400, 'User Already Exists')
    }
    role === "admin" ? role = "admin" : role = "user"
    let hashedPassword = await generateEncryptedPassword(password)
    const newUser = await createUser(first_name, last_name, email, hashedPassword, role)
    return res.status(201).send(new ApiResponse(201, newUser, 'User Registred Successfully'))
})

export const loginUser= catchAsync( async(req, res)=>{
    const {email,password}=req.body
    const userExists = await fetchUserByEmail(email)
    if (!userExists) {
        throw new ApiError(404, 'User Not Found')
    }
    const correctPassword=await validateThePassword(password,userExists.password)
    if(!correctPassword){
        throw new ApiError(401,'Incorrect Password!')
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userExists);
    return res.status(200).send(new ApiResponse(200,{accessToken,refreshToken},'logged in successful'))
})

export const getAllUserList = catchAsync(async (req, res)=>{
    let userDetails=await getAllUser()
    if(!userDetails.length){
        throw new ApiError(404,'no user found')
    }
    return res.status(200).send(new ApiResponse(200,userDetails,'User List Fetched Successfully'))
})

export const getUserProfile = catchAsync(async (req, res)=>{
    let userDetails=await fetchUserById(req.params.id)
    if(!userDetails){
        throw new ApiError(404,'no user found')
    }
    return res.status(200).send(new ApiResponse(200,userDetails,'UserDetails Fetched Successfully'))
})

export const deleteUserProfile = catchAsync(async (req, res)=>{
    let userDetails=await fetchUserById(req.params.id)
    if(!userDetails){
        throw new ApiError(404,'no user found')
    }
    let deleteUser=await deleteUserById(req.params.id)
    return res.status(204).send(204,deleteUser,'user deleted')
})

export const updateUserProfile = catchAsync(async (req, res)=>{
    let userDetails=await fetchUserById(req.params.id)
    if(!userDetails){
        throw new ApiError(404,'no user found')
    }
    let updateUser=await updateUserById(req.params.id,req.body)
    return res.status(200).send(new ApiResponse(200,updateUser,'UserDetails Update Successfully'))
})