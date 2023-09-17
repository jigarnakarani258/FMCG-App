const { AppError } = require('../utility/appError');

const sendErrToDevlopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrToProduction = (err, res) => {
  //Operational,trusted error : send message to client
  if (err.isOperational == true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //programming and unknown error: don't leak error details.
    //1)Log error
    console.error('Error', err);

    //2)send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const HandleCastErrorDB = (err) => {
  err.message = `Invalid ${err.path} : ${err.value} , Enter right value of ${err.path} field`;
  return new AppError(err, 400);
};

const HandleDuplicateFieldsDB = (err) => {
  err.message = `Duplicate field value: ${err.keyValue.email} , user email already exist`;
  return new AppError(err, 400);
};

const HandleValidationErrorDB = (err) => {
  const errMessage = Object.values(err.errors).map(
    (el) => el.properties.message
  );
  err.message = `Input valid value: ${errMessage.join(' , ')}`;
  return new AppError(err, 400);
};

const HandleCustomPathErrorDB = (err) => {
  err.message = err.message;
  return new AppError(err, 400);
};

//Global error Middleware 
const globalErrController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrToDevlopment(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    //here moongose err object store into error
    let error = { ...err };
    if (err.err.name === 'CastError') {
      error = HandleCastErrorDB(error.err);
    }
    if (err.err.code === 11000) {
      error = HandleDuplicateFieldsDB(error.err);
      console.log(error);
    }
    if (err.err.name === 'ValidationError') {
      error = HandleValidationErrorDB(error.err);
    }
    if (err.err.name === 'customPathError') {
      error = HandleCustomPathErrorDB(error.err);
    }

    sendErrToProduction(error, res);
  }
};

module.exports = { globalErrController };
