const ForbiddenError = require("../errors/ForbiddenError");
function authorizationMiddleware(...roles){
    return (req, res, next) => {
        if(!roles.includes(req.user.rol)){
            throw new ForbiddenError("You do not have permission to perform this action.");
        }
    }
}
module.exports = authorizationMiddleware;