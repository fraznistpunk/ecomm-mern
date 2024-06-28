const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.this.status(400);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    // check for mongoose bad ObjectId
    // if(err.name === 'CastError' && err.kind === 'ObjectId') {
    //     msg = 'Resource not found';
    //     statusCode = 404;
    // }
    
    res.status(statusCode).json({
      msg: message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export {notFound, errorHandler};