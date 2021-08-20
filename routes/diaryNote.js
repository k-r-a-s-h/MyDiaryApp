const express = require('express')
const router = express.Router()

const { isAuthorized } = require('../middlewares/auth')
const { getPost,getAllPost,newPost,deletePost } = require('../controllers/noteContollers')

//get post with id
router.get('/:id',isAuthorized,getPost)
//create new post 
router.post('/',isAuthorized,newPost)
//get all post for a user 
router.get('/',isAuthorized,getAllPost)
//delete post for user
router.delete('/:id',isAuthorized,deletePost)

module.exports = router

