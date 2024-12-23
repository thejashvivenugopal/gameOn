import { login } from "../controllers/user-controller.js";
import User from "./../models/user.js";
import { emailHelper } from "./email-service.js";
import * as authservice from "./auth-service.js";
 
export const save = async (newUser) => {
    let user = await User.find({
        $or: [
            { emailId: newUser?.emailId },
            { mobileNumber: newUser?.mobileNumber }
        ]
    });
    if (user[0]) {
        throw new Error('Account Already Exists!')
    }
    user = new User(newUser);
    return user.save();
}

export const findAll = () => {
    return User.find(); // Retrieves all users from the database
};

export const find = (userHashId) => {
    return User.findOne({ userHashId }); // Retrieves all users from the database
};

export const findByEmail = (emailId) => {
    return User.findOne({ emailId }); // Retrieves all users from the database
};

export const updateById = (id, updatedData) => {
    return User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

};

export const deleteById = (id) => {
    return User.findByIdAndDelete(id);
};

export const userLogin = async (email, password) => {
    const user = await User.findOne({ emailId: email, password: password })
    
    if (user.length !== 0) {
        const token = authservice.generateToken({id: user._id, email: email});
        const userId = user._id;
        const role = user.role;
        const userHashId = user.userHashId;
        const extractedUserId = {
        userId: userId,
        role: role,
        userHashId: userHashId,
        token: token
    };
        if (user?.login) {
            throw new Error("USER_ALREADY_LOGGED_IN");
        }
        return extractedUserId;
    }

    throw new Error("INVALID CREDENTIALS");
}

export const userLogout = async (userId) => {
    const user = await User.findById(userId);

    if (user.length !== 0) {
        if (user?.login) {
            return user.updateOne({ login: false }, { new: true })
        }
        else {
            throw new Error("SOMETHING WENT WRONG")
        };
    }

    throw new Error("SOMETHING WENT WRONG");
}

export const sendOtp = async (request, response) => {
    const { emailId } = request.body;
    const user = await User.findOne({ emailId: emailId });
    if(!user)
        return response.status(404).send({ message: "User not found" });
    else{
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);
        user.updateOne({otp : otp, lastOtpTime: new Date()})
        const emailSent = await emailHelper(user.emailId,"TESTING_SUB",otp.toString())
        if(emailSent){
            return response.status(200).send({ message: "Otp sent successfully" });
        }
        return response.status(500).send({ message: "SOMETHING WENT WRONG" });
    }
}






