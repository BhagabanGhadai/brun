import express from 'express';
const userRouter=express.Router()
import {registerUser,loginUser,getUserProfile,deleteUserProfile,updateUserProfile,getAllUserList} from '../services/userService.js';

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/list').get(getAllUserList)
userRouter.route('/:id').get(getUserProfile)
userRouter.route('/:id').delete(deleteUserProfile)
userRouter.route('/:id').patch(updateUserProfile)

export default userRouter