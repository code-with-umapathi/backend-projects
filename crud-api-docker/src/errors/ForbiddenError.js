const AppError = require("./AppError");
class ForbiddenError extends AppError {
    constructor(message = "Forbidden Request") {
        super(message, 403);
    }
}
module.exports = ForbiddenError;