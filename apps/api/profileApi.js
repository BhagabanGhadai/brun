import express from 'express';
const profileRouter=express.Router()
import { addAddressToProfile,getAddressFromProfile,updateAddressFromProfile,deleteAddressFromProfile,getAllAddressOfUser } from '../services/profileService.js';

profileRouter.route('/').post(addAddressToProfile)
profileRouter.route('/all/:id').get(getAllAddressOfUser)
profileRouter.route('/:id').get(getAddressFromProfile)
profileRouter.route('/:id').patch(updateAddressFromProfile)
profileRouter.route('/:id').delete(deleteAddressFromProfile)

export default profileRouter