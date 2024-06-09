const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.this.status(400);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let msg = err.message;
    // check for mongoose bad ObjectId
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        msg = 'Resource not found';
        statusCode = 404;
    }

    res.status(statusCode).json({
        msg,
        stack : process.env.NODE_ENV === 'production' ? "an error occured (^_^)" : err.stack,
    });
};

export {notFound, errorHandler};