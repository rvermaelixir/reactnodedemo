const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const config = require('config')
 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// @route  "GET /api/comments"
// @desc   "fetch all users"
// @access "public"
router.get("/", auth, async (req, res) => {
    try {
        const user =  await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        res.status(401).json({msg: err.message})
    }
})

router.post("/", async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user){
            return res.status(403).json({"msg": "User dont exist"})
        }
        verifiedUser = await bcrypt.compare(req.body.password, user.password)
        if(!verifiedUser){
            return res.status(403).json({"msg": "Username or password are not correct"})
        }
        token = jwt.sign({
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            }
        }, 
        config.get('jwtSecret'),
        {"expiresIn": 360000000},
        (err, token) => {
            if(err) throw err
            res.json({token})
        })
    } catch(err) {
        res.status(500).json({"msg": "Internal server error"})
    }
})

module.exports = router
