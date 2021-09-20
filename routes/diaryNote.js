const express = require('express')
const router = express.Router()
const { isValidId } = require('../middlewares/mongooseIdValidation')
const { isAuthorized } = require('../middlewares/auth')
const { noteValidation } = require('../middlewares/noteValidation')
const { getPost,getAllPost,newPost,deletePost,editPost } = require('../controllers/noteContollers')

//get post with id
router.get('/:id',isAuthorized,isValidId,getPost)
//create new post 
router.post('/',isAuthorized,noteValidation,newPost)
//get all post for a user 
router.get('/',isAuthorized,getAllPost)
//delete post for user
router.delete('/:id',isAuthorized,isValidId,deletePost)
//update the post
router.put('/:id',isAuthorized,isValidId,noteValidation,editPost)

module.exports = router

