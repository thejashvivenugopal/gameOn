import OwnerModel from "../models/owner.js";
import UserModel from "../models/user.js";
import * as userService from '../services/user-server.js'

// Save a new Owner
export const save = async (ownerData) => {
    const user = await userService.findByEmail(ownerData?.user?.emailId);

    if (user)
        throw new Error('Already exists')

    ownerData.user.role = "OWNER"
    const createUser = await userService.save(ownerData?.user)
    if (!createUser)
        throw new Error("Something went wrong")

    ownerData.user = createUser;

    const owner = new OwnerModel(ownerData);
    return await owner.save();
};

// Find all Owners
export const findAll = async () => {
    return await OwnerModel.find({});
};

// Find an Owner by ID
export const findById = async (userHashId) => {
    return await OwnerModel.findOne({ 'user.userHashId': userHashId });
};

export const findByHashId = async (userHashId) => {
    return await OwnerModel.findOne({ 'user.userHashId': userHashId });
};

// Update an Owner by ID
export const update = async (userHashId, updatedData) => {

    return await OwnerModel.findOneAndUpdate({ 'user.userHashId': userHashId }, updatedData, { new: true });
};

// Delete an Owner by ID
export const deleteById = async (id) => {
    return await OwnerModel.findByIdAndDelete(id);
};
