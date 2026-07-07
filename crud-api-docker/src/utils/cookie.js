const { calculateRefreshExpiry } = require("./jwt");
const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: calculateRefreshExpiry()
}
module.exports = { refreshCookieOptions };