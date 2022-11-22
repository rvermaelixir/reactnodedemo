const express = require('express')

const router = express.Router()

// @route  "GET /api/comments"
// @desc   "fetch all users"
// @access "public"
router.get("/", (req, res) => {
    res.send(`get comments`)
})

module.exports = router
