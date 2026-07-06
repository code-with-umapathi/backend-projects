const AppError = require("./AppError");
class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
        super(message, 400)
    }
}
module.exports = ValidationError;