class AppError extends Error{
    constructor(err , statusCode ){
        super(err.message);

        this.err = err;
        this.statusCode =statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'Error';
        this.isOperational = true,
        
        Error.captureStackTrace(this ,this.constructor)
    }
}

module.exports = {
    AppError
}