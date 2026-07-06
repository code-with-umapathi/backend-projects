const UnauthorizedError = require("../errors/UnauthorizedError");
const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("Authentication required");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
        throw new UnauthorizedError("Invalid authentication scheme");
    }
    if (!token) {
        throw new UnauthorizedError("Authentication token is missing");
    }
    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new UnauthorizedError("Invlalid or expire token");
    }
    req.user = {
        id: payload.sub
    }
    next();
}
module.exports = authMiddleware;