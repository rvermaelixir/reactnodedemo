const config = require('config')
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    // get token from header
    const token  = req.header('x-auth-token')

    //check if not token
    if(!token){
        return res.status(401).json({msg: "No Token, Authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err){
        res.status(401).json({ msg: 'Token is not valid'})
    }
}