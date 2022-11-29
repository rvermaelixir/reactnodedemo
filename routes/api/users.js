const express = require('express')

const router = express.Router()
const { validationResult, check } = require('express-validator');
const User = require('../../models/User')
const gravatar = require('gravatar') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../../models/User');
const config = require('config')
// @route  "GET /api/users"
// @desc   "fetch all users"
// @access "public"
router.get("/", (req, res) => {
    res.send(`get users`)
})



// @route  "POST /api/users"
// @desc   "register new user"
// @access "public"
router.post("/", 
[
    check('email', 'Require Proper Email Value').isEmail().normalizeEmail(),
    check('name', "Name is required").not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('password', 'Please add password of minimum 6 characters').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(422).json({error: errors.array()})
    }
    let {name, dateOfBirth, password, phone, email} = req.body
    try {
        let users = (await User.find({$or: [{"email": email} , {"phone": phone}]})).length
        
        if(users>0){
            return res.status(500).json({"error": {"msg": 'User with same email or phone already exists'}})
        }

        const avatar = await gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
       
        const createdUser = new User({
            name, 
            dateOfBirth, 
            password, 
            phone, 
            email,
            avatar
        })

        const salt = await bcrypt.genSalt(10)
        createdUser.password = await bcrypt.hash(password, salt)

        await createdUser.save()
        const payload = {
            user: {
                id: createdUser.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {"expiresIn": 360000000},
            (err, token) => {
                if(err) throw err
                res.json({token})
            }
        )

    } catch (err){
        res.json({"error": {"msg": err.message}})
    }
    
})

module.exports = router