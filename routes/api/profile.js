const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { validationResult, check } = require('express-validator');
const profile = require('../../models/Profile')
const config = require('config')
const request = require('request')
// @route  "GET /api/profile/me"
// @desc   "fetch current user profile"
// @access "private"
router.get("/me", auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
        if(!profile){
            res.status(400).json({msg: "No profile found for the user"})
        }
        res.send(profile)
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})

// @route  "Post /api/profile"
// @desc   "Create user profile"
// @access "private"
router.post("/", 
[
    auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills are required as array of strings').not().isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        skills, 
        status, 
        company, 
        website, 
        location, 
        bio, 
        githubusername, 
        experience, 
        education, 
        date, 
        facebook, 
        twitter, 
        linkedin, 
        instagram, 
        youtube
    } = req.body
    const profileFields = {}
    profileFields.user = req.user.id
    profileFields.skills = skills.split(",").map(skill => skill.trim())
    profileFields.status = status
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(githubusername) profileFields.githubusername = githubusername
    if(experience) profileFields.experience = experience
    if(education) profileFields.education = education
    
    if(date) profileFields.date = date

    profileFields.social = {}
    if(facebook) profileFields.social.facebook = facebook
    if(twitter) profileFields.social.twitter = twitter
    if(linkedin) profileFields.social.linkedin = linkedin
    if(instagram) profileFields.social.instagram = instagram
    if(youtube) profileFields.social.youtube = youtube
    try {
        let profile = await Profile.findOne({user: req.user.id})
        if(profile){
            // update the existing profile 
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true }
            )
            return res.json(profile)
        }

        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (err){
        res.status(500).json({ msg: err.message })
    }
})

// @route  "Get /api/profile"
// @desc   "fetch all user profiles"
// @access "public"
router.get('/', async (req, res) => {
    try{
        profiles = await Profile.find().populate('user', ['avatar', 'name'])
        console.log(profiles)
        res.json(profiles)
    } catch(err){
        res.status(500).json({ msg: err.message })
    }
})

// @route  "Get /api/profile/user/:user_id"
// @desc   "get profile of specific user"
// @access "public"
router.get('/user/:user_id', async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['avatar', 'name'])
        if(!profile){
            return res.status(400).json({ msg: "Profile Not Found" })
        }
        res.json(profiles)
    } catch(err){
        res.status(500).json({ msg: err.message })
    }
})

// @route  "Delete /api/profile"
// @desc   "delete profile user && posts"
// @access "private"
router.delete('/', auth, async (req, res) => {
    try{
        // Remove Profile for a user
        await Profile.findOneAndRemove({ user: req.user.id})
        await User.findOneAndRemove({ _id: req.user.id})
        
        return res.json({ msg: "User Deleted Successfully" })
        
    } catch(err){
        res.status(500).json({ msg: err.message })
    }
})

// @route  "Put /api/profile/experience"
// @desc   "update experience for user profile"
// @access "private"
router.put('/experience', 
    [
        auth, 
        [
            check('title', "Title is required").not().isEmpty(),
            check('company', "Company is required").not().isEmpty(),
            check('from', 'From Date is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(401).json(errors.array())
            }

            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body

            const experienceParams = {}
            experienceParams.title = title
            experienceParams.company = company
            experienceParams.from = from
            if(location) experienceParams.location = location
            if(to) experienceParams.to = to
            if(current) experienceParams.current = current
            if(description) experienceParams.description = description
            let profile = await Profile.findOne({user: req.user.id})
            if(!profile){
                return res.status(400).json({ msg: "User profile not found" })
            }
            profile.experience.unshift(experienceParams)
            profile = await Profile.findOneAndUpdate({_id: profile.id}, {$set: profile}, {new: true})
            res.json(profile)
        } catch(err) {
            res.status(500).json({ msg: err.message })
        }
    }
)

// @route  "Delete /api/profile/experience/:exp_id"
// @desc   "delete experience of user"
// @access "private"
router.delete("/experience/:exp_id", [auth], async (req, res) => {
    try{
        let profile = await Profile.findOne({user: req.user.id})
        if(!profile){
            return res.send({ msg: "Profile didnt exist" })
        }
        const updatedExperience = await profile.experience.filter((exp) => exp.id != req.params.exp_id)
        
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, {$set: {experience: updatedExperience}}, {new: true})
        res.send(profile)
    } catch (err){
        res.status(500).json({ msg: err.message })
    }
})

// @route  "Put /api/profile/education"
// @desc   "Add new education entry to user profile"
// @access "private"
router.put("/education", 
    [
        auth,
        [
            check("school", "School is required").not().isEmpty(),
            check("degree", "Degree is required").not().isEmpty(),
            check("fieldofstudy", "Field of study is required").not().isEmpty(),
            check("from", "From Value is required").not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array() })
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body
        try {
            const educationParams = {}

            educationParams.school = school
            educationParams.degree = degree
            educationParams.fieldofstudy = fieldofstudy
            educationParams.from = from
            if(to) educationParams.to = to
            if(current) educationParams.current = current
            if(description) educationParams.description = description

            let profile = await Profile.findOne({ user: req.user.id })
            if(!profile){
                return res.send(400).json({ msg: "Profile record dont exist" })
            }
            profile.education = await profile.education.unshift(educationParams)

            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                {$set: profile}, 
                {return: true}
            )

            res.json(profile)
        } catch(err){
            res.status(500).json({error: err.message})
        }
    }
)

// @route  "Delete /api/profile/education/:education_id"
// @desc   "delete education of user"
// @access "private"
router.delete("/education/:education_id", [auth], async (req, res) => {
    try{
        let profile = await Profile.findOne({ user: req.user.id })
        if(!profile){
            return res.status(400).json({ msg: "Profile dont exist" })
        }
        updatedEducation = await profile.education.filter((education) => education.id != req.params.education_id)
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, {$set: {education: updatedEducation}}, {return: true})

        res.send(profile)

    } catch(err) {
        res.status(500).json({ msg: err.message })
    }
})

// @route "GET /api/profile/github/:username"
// @desc "Get github repositories for a username"
// @access "public"
router.get("/github/:username", async (req, res) => {
    try {
        const requestData = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(requestData,(error, response, data) => {
            if(error) return res.status(error.statusCode).json({msg: error.message})
            if(response.statusCode != 200) return res.status(response.statusCode).json({msg: "No Github repos found"})
           
            res.json(JSON.parse(data))
        })
    } catch(err){
        res.status(500).json({ msg: err.message })
    }
})

module.exports = router