import * as userService from "../services/user-server.js";
import { setError, setSuccess } from "./response-handler.js"
export const post = async (request, response) => {
    try {
        const newuser = { ...request.body };
        const user = await userService.save(newuser);
        setSuccess(user, response);
        //setSuccess("test", response)
    } catch (error) {

        setError(error, response)
    }
}

export const get = async (request, response) => {
    try {
        if (request.params.id != undefined || request.params.id != null) {
            const id = request.params.id
            const user = await userService.find(id);
            setSuccess(user, response);

        }
        else {
            const user = await userService.findAll();
            setSuccess(user, response);

        }
        //setSuccess("test", response)
    } catch (error) {

        setError(error, response)
    }
}


export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updatedData = request.body;

        const updatedUser = await userService.updateById(id, updatedData);
        setSuccess(updatedUser, response);


        //setSuccess("test", response)
    } catch (error) {

        setError(error, response)
    }
}


export const deleteById = async (request, response) => {
    try {

        const { id } = request.params;


        const deletedUser = await userService.deleteById(id);

        setSuccess(deletedUser, response);
        //setSuccess("test", response)
    } catch (error) {

        setError(error, response)
    }
}

export const login = async (request, response) => {
    try {
        const loginCredentials = { ...request.body };
        const user = await userService.userLogin(loginCredentials.email, loginCredentials.password);
        setSuccess(user, response);
    } catch (error) {
        setError(error, response)
    }
}