const AppError = require("./AppError");
class ConflictError extends AppError{
    constructor(message = "Resource Already Exists"){
        super(message, 409);
    }
}
module.exports = ConflictError;