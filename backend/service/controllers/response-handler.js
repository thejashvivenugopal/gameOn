export const setSuccess = (data, response) => {
    response.status(200)
    response.json(data);
}


export const setError = (error, response, statusCode = 500) => {
    response.status(statusCode);
    response.json({
        message: error?.message || error
    });
};

