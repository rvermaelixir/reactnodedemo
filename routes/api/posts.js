const express = require('express')
const Post =  require('../../models/Post')
const auth =  require('../../middleware/auth')
const {check, validationResult} = require('express-validator')
const router = express.Router()


// @route  "Posts /api/posts"
// @desc   "create new Post"
// @access "private"
router.post("/", 
[
    auth, 
    [
        check('text', 'Text field is required').not().isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.send(400).json(error.array())
    }
    try {
        const postRequest = {
            user: req.user.id,
            text: req.body.text,
            avatar: req.user.avatar
        }

        const post = new Post(postRequest)
        await post.save()

        res.send(post)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

// @route Get "/api/posts/:post_id"
// @desc "Get All posts"
// @access "Public"
router.get("/:post_id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id).populate('user', ['_id', 'name', 'avatar']) 
        if(!post) return res.status(400).send({ msg: "No such post found" })

        res.send(post)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

// @route Delete "/api/posts/:post_id"
// @desc "Delete a specific post with all comments and likes"
// @access "Private"
router.delete("/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.post_id, user: req.user.id})
        if(!post) return res.status(400).send({ msg: "No post for specified user exists" })
        await Post.findByIdAndDelete(req.params.post_id)
        res.send({ msg: "Post Deleted Successfully" })
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

// @route Get "/api/posts"
// @desc "Get allposts"
// @access "public"
router.get("/", async(req, res) => {
    try {
        const posts = await Post.find().populate("user", ["_id", "name", "avatar"])
        res.json(posts)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// @router Get "/api/posts/:post_id/like
// @desc "Like posts"
// @access "Private"
router.put("/:post_id/like", [auth], async (req, res) => {
    try {
        let post = await Post.findOne({_id: req.params.post_id})
        if (!post) return res.status(400).json({ msg: "Post dont exist" })
        filteredUserLikes = await post.likes.filter((like) => like.user._id.toString() == req.user.id)
        if(filteredUserLikes.length !=0) return res.status(400).json({ msg: "You have already liked the post" })
        postUserLikeObject = {
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
        }
        post.likes.unshift(postUserLikeObject)
        post = await Post.findOneAndUpdate(
            {_id: req.params.post_id}, 
            {$set: post},
            {new: true}
        )
        res.json(post)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

// @router Get "/api/posts/:post_id/unlike
// @desc "Unlike posts"
// @access "Private"
router.put("/:post_id/unlike", [auth], async (req, res) => {
    try {
        let post = await Post.findOne({_id: req.params.post_id})
        if (!post) return res.status(400).json({ msg: "Post dont exist" })
        
        postUserLikeObject = {
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
        }
        const updatedPostLikes = await post.likes.filter((like) => like.user._id.toString() != req.user.id )
        
        post = await Post.findOneAndUpdate(
            {_id: req.params.post_id}, 
            {$set: {likes: updatedPostLikes}},
            {new: true}
        )
        res.json(post)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

// @route "Post /api/posts/:post_id/comments"
// @desc "add new comment to a post"
// @access "Private"
router.put("/:post_id/comments", 
    [
        auth,
        [
            check('text', 'Comment is required').not().isEmpty()
        ]        
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json(errors.array())
        try {
            let post = await Post.findById(req.params.post_id)
            if(!post) return res.status(401).json({ msg: "Post dont exist" })
            const commentParams = {
                user: req.user.id,
                name: req.user.name,
                avatar: req.user.avatar,
                text: req.body.text
            }
            post.comments.unshift(commentParams)
            post = await Post.findOneAndUpdate(
                {_id: req.params.post_id}, 
                {$set: post},
                {new: true}
            )
            res.json(post)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
)

// @route "Delete /api/posts/:post_id/comments"
// @desc "delete comment for a post"
// @access "Private"
router.delete("/:post_id/comments/:comment_id", 
    [ auth ],
    async (req, res) => {
        try {
            let post = await Post.findById(req.params.post_id)
            if(!post) return res.status(401).json({ msg: "Post dont exist" })
            if(post.user._id.toString() != req.user.id) return res.status(400).json({ msg: "User Not Authorized" })
            const updatedComments = await post.comments.filter((comment) => req.params.comment_id != comment._id.toString())
    
            post = await Post.findOneAndUpdate(
                {_id: req.params.post_id}, 
                {
                    $set: {
                        comments: updatedComments
                    }
                },
                {new: true}
            )
            res.json(post)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
)

module.exports = router
