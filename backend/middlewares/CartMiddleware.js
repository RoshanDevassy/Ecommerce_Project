const jwt = require('jsonwebtoken');

function cartMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];
    console.info(`Token : ${token}`)

    if (!token || token === "null" || token === null ) {
        console.error("No token Provided, sending 401")
        return res.status(401).json({ error: "noToken" })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (error) {
        console.error(`JWT Error : ${error}`)
        return res.status(401).json({ error: "TokenExpired" })
    }
}

module.exports = cartMiddleware;