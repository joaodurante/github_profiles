const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';

    if(err.stack)
        console.log(err.stack);
    
    res.status(status).send({
        status,
        message
    });
}

export default errorHandler;