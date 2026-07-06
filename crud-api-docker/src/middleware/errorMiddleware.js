function errorMiddleware(err, req, res, next) {
    if (err.isOperational) {
        console.warn(err.message);
        return res.status(err.statusCode || 500).json({
            success: false,
            error: {
                type: err.name,
                message: err.message
            }
        });
    } else {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: {
                type: "InternalServerError",
                message: "Internal Server Error"
            }
        })
    }
}
module.exports = errorMiddleware;