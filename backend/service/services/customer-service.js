import User from "./../models/user.js";


export const findAllCustomers = async () => {
    // Fetches all users with the role 'CUSTOMER'
    const users = await User.find({ role: "CUSTOMER" });
    return users;
}