const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multer')   



const { userRegister, userLogin, uploadPost, getAllPost,
    deletePost, commentOnSomeonePost, likeSomeonePost,
    getUsersPost
} = require('../controllers/userController')


router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/uploadPost', passport.authenticate('jwt', { session: false }), upload.single("imgUrl"), uploadPost)

router.get('/getAllPost', passport.authenticate('jwt', { session: false }), getAllPost)

router.get('/usersPost', passport.authenticate('jwt', { session: false }), getUsersPost)

router.post('/deletePost', passport.authenticate('jwt', { session: false }), deletePost)

router.post('/post/comment', passport.authenticate('jwt', { session: false }), commentOnSomeonePost)

router.post('/post/like', passport.authenticate('jwt', { session: false }), likeSomeonePost)



module.exports = router